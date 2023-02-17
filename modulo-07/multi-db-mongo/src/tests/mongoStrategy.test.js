const assert = require("assert");
const MongoDb = require("../databases/strategies/MongoDb");
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

describe("Tests of MongoDB Strategy", () => {
    before(async () => {
        await database.connect();
    });

    // after(async () => {
    //     await database.removeAll();
    // });

    it("Verify connection with database", async () => {
        const databaseConnectionStatus = await database.isConnected();
        assert.deepEqual("Connected", databaseConnectionStatus);
    });

    it("Create a hero", async () => {
        let heroes = await database.create(MOCK_HEROES_CREATE);
        console.log(heroes);
        heroes = heroes.map(hero => {
            return {
                name: hero.name,
                power: hero.power
            }
        });

        assert.deepEqual(heroes, MOCK_HEROES_CREATE);
    });

    it("Read a hero", async () => {
        // const { name, power } = await database.read({ name: MOCK_HERO_CREATE.name });
        const [{ name, power }] = await database.read({ name: MOCK_HERO_CREATE.name });
        console.log({ name, power });
        // console.log("[heroes]", heroes);
        assert.deepEqual({ name, power }, MOCK_HERO_CREATE);
    });

    xit("Update a hero", () => {
        database.update();
    });
});