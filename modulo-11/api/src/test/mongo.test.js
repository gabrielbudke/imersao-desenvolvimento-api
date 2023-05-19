import assert from "assert";
import ContextDatabase from "../database/ContextDatabase.js";
import MongoDb from "../database/strategies/mongodb/MongoDb.js";
import HeroSchema from "../database/strategies/mongodb/schemas/Hero.js";

const HERO_MOCK = {
    name: "Thor",
    power: "Raio"
};

let database = {};
describe("Mongo Strategy", () => {
    before(async () => {
        const connection = await MongoDb.connect();
        database = new ContextDatabase(new MongoDb(connection, HeroSchema));
    });

    after(async () => {
        await database.deleteAll(); // --> limpa o banco de dados mongo;
        MongoDb.disconnect();
    });

    it("should connect to database", async () => {
        const isConnected = await database.isConnected();
        assert.deepEqual(isConnected, true);
    });

    it("should create a hero", async () => {
        const { name, power } = await database.create(HERO_MOCK);
        assert.deepEqual({ name, power }, HERO_MOCK);
    });

    it("should read a hero", async () => {
        const [{ name, power }] = await database.read({ name: HERO_MOCK.name });
        assert.deepEqual({ name, power }, HERO_MOCK);
    });

    it("should update a hero", async () => {
        const [hero] = await database.read({ name: HERO_MOCK.name });
        const heroId = hero._id.toString();
        const heroUpdated = await database.update(heroId, { name: "Shazam" });
        assert.deepEqual(heroUpdated.modifiedCount, 1);
    });

    it("should delete a hero", async () => {
        const [hero] = await database.read();
        const heroId = hero._id.toString();
        const heroDeleted = await database.delete(heroId);
        assert.deepEqual(heroDeleted.deletedCount, 1);
    });

});