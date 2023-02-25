const assert = require("assert");
const MongoDb = require("../databases/strategies/mongodb/MongoDb");
const ContextDatabase = require("../databases/ContextDatabase");

const database = new ContextDatabase(new MongoDb());

const MOCK_HEROES_CREATE = [
    {
        name: "Arqueiro Verde",
        power: "Flechas"
    },
    {
        name: "Mulher Maravilha",
        power: "Laço"
    }
];

const MOCK_HERO_CREATE = {
    name: "Mulher Maravilha",
    power: "Laço"
};

const MOCK_HERO_UPDATE = {
    name: "Homem Aranha",
    power: "Teia"
};

describe("Tests of MongoDB Strategy", () => {
    before(async () => {
        await database.connect();
        const hero = await database.create(MOCK_HERO_UPDATE);
        MOCK_HERO_UPDATE.id = hero._id;
    });

    after(async () => {
        await database.deleteAll();
        database.disconnect();
    });

    it("Verify connection with database", async () => {
        const databaseConnectionStatus = await database.isConnected();
        assert.deepEqual("Connected", databaseConnectionStatus);
    });

    it("Create a hero", async () => {
        let heroes = await database.create(MOCK_HEROES_CREATE);
        heroes = heroes.map(hero => {
            return {
                name: hero.name,
                power: hero.power
            }
        });

        assert.deepEqual(heroes, MOCK_HEROES_CREATE);
    });

    it("Read a hero", async () => {
        const [{ name, power }] = await database.read({ name: MOCK_HERO_CREATE.name });
        assert.deepEqual({ name, power }, MOCK_HERO_CREATE);
    });

    it("Update a hero", async () => {
        const heroUpdated = await database.update(MOCK_HERO_UPDATE.id, {
            name: "Homem-Aranha 2099"
        });
        assert.deepEqual(heroUpdated.modifiedCount, 1);
    });

    it("Delete a hero", async () => {
        const heroDeleted = await database.delete(MOCK_HERO_UPDATE.id);
        assert.deepEqual( heroDeleted.deletedCount, 1)
    });
});