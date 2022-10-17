const assert = require("assert");
const Postgres = require("../databases/strategies/Postgres");
const ContextDatabase = require("../databases/ContextDatabase");

const database = new ContextDatabase(new Postgres());
const MOCK_CREATE_HERO = {
    name: "Gavião Arqueiro",
    power: "Flexas"
};

describe("Tests of Postgres Strategy", function () {
    this.timeout(Infinity);
    this.beforeAll(async () => {
        await database.connect();
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
});