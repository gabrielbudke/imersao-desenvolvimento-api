const assert = require("assert");
const MongoDb = require("../databases/strategies/MongoDb");
const ContextDatabase = require("../databases/ContextDatabase");

const database = new ContextDatabase(new MongoDb());

describe("Tests of Postgres Strategy", () => {
    before(async () => {
        await database.connect();
    });

    it("Verify connection with database", async () => {
        const databaseConnectionStatus = await database.isConnected();
        assert.deepEqual("Connected", databaseConnectionStatus);
    });
});