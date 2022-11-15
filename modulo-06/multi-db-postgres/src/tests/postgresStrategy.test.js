const assert = require("assert");
const Postgres = require("../databases/strategies/Postgres");
const ContextDatabase = require("../databases/ContextDatabase");
const { X509Certificate } = require("crypto");

const database = new ContextDatabase(new Postgres());
const MOCK_CREATE_HERO = {
    name: "Gavião Arqueiro",
    power: "Flexas"
};

const MOCK_UPDATE_HERO = {
    name: "Shazam",
    power: "Magia"
};

describe("Tests of Postgres Strategy", function () {
    this.timeout(Infinity);
    this.beforeAll(async () => {
        await database.connect();
        await database.delete();
        await database.create(MOCK_UPDATE_HERO);
    });

    it("Verify connection with database", async function () {
        const isConnected = await database.isConnected();
        assert.equal(isConnected, true);
    });

    it("Create a hero", async function () {
        const hero = await database.create(MOCK_CREATE_HERO);
        delete hero.id;
        assert.deepEqual(hero, MOCK_CREATE_HERO);
    });

    it("Read a hero", async function() {
        const [hero] = await database.read({ name: MOCK_CREATE_HERO.name });
        delete hero.id;
        assert.deepEqual(hero, MOCK_CREATE_HERO);
    });

    it("Update a hero", async function() {
        const [hero] = await database.read({ name: MOCK_UPDATE_HERO.name });

        /**
         * No Javascript existe uma técnica chamada rest/spread que é um método
         * usado para 'juntar' objetos.
         */
        const heroToUpdate = {
            ...MOCK_UPDATE_HERO,
            name: "Mulher Maravilha"
        };
        
        await database.update(hero.id, heroToUpdate);

        const [heroUpdated] = await database.read({ id: hero.id });

        assert.deepEqual(heroUpdated.name, heroToUpdate.name);
    });

    it("Delete a hero", async () => {
        const [hero] = await database.read({ name: MOCK_CREATE_HERO.name });

        await database.delete(hero.id);

        const heroDeleted = await database.read({ id: hero.id });

        assert.deepEqual(heroDeleted, []);
    })

});