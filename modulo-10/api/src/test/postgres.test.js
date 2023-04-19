import assert from "assert";
import ContextDatabase from "../database/ContextDatabase.js";
import Postgres from "../database/strategies/postgres/Postgres.js";

let database = {};
describe("Postgres Strategy Suite", () => {
    before(async () => {
        const connection = await Postgres.connect();
        database = new ContextDatabase(new Postgres(connection));
    });

    it("should connect to database", async () => {
        const isConnected = await database.isConnected();
        assert.deepEqual(isConnected, true);
    });
});