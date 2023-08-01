const assert = require("assert");
const ContextDatabase = require("../database/ContextDatabase.js");
const Postgres = require("../database/strategies/postgres/Postgres.js");
const Hero = require("../database/strategies/postgres/schemas/Hero.js");

const MOCK_CREATE_HERO = {
    name: "Gavião Arqueiro",
    power: "Flexas"
};

const MOCK_UPDATE_HERO = {
    name: "Arqueiro-Verde",
};

let database = {};
describe("Postgres Strategy", () => {
    before(async () => {
        const connection = await Postgres.connect();
        const schema = await Postgres.defineModel(connection, Hero);
        database = new ContextDatabase(new Postgres(connection, schema));
    });

    after(async () => {
        await Hero.destroy({
            truncate: true
        });
        await database.disconnect();
    });

    it("should connect to database", async () => {
        const isConnected = await database.isConnected();
        assert.deepEqual(isConnected, true);
    });

    it("should create a new hero", async () => {
        const hero = await database.create(MOCK_CREATE_HERO);
        delete hero.id;
        assert.deepEqual(hero, MOCK_CREATE_HERO);
    });

    it("should read a hero", async () => {
        const [hero] = await database.read({ name: MOCK_CREATE_HERO.name });
        delete hero.id;
        assert.deepEqual(hero, MOCK_CREATE_HERO);
    });

    it("should update any info about a hero", async () => {
        const [hero] = await database.read({ name: MOCK_CREATE_HERO.name });
        await database.update(hero.id, MOCK_UPDATE_HERO);
        const [heroUpdated] = await database.read({ id: hero.id });
        assert.deepEqual(heroUpdated.id, hero.id);
    });

    it("should delete a hero", async () => {
        const [heroBeforeDelete] = await database.read({ name: MOCK_UPDATE_HERO.name });
        await database.delete(heroBeforeDelete.id);
        const [heroAfterDelete] = await database.read({ name: MOCK_UPDATE_HERO.name });
        assert.deepEqual(heroAfterDelete, undefined);
    });
});