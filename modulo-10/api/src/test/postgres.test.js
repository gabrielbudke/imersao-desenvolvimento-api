import assert from "assert";
import ContextDatabase from "../database/ContextDatabase.js";
import Postgres from "../database/strategies/postgres/Postgres.js";
import Hero from "../database/strategies/postgres/schemas/Hero.js";
import { markAsUntransferable } from "worker_threads";

const MOCK_CREATE_HERO = {
    name: "Gavião Arqueiro",
    power: "Flexas"
};

let database = {};
describe("Postgres Strategy Suite", () => {
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
        const hero = await database.read({ name: MOCK_CREATE_HERO });
        delete hero.id;
        assert.deepEqual(hero, MOCK_CREATE_HERO);
    });
});