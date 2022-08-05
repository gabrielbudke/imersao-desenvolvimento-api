const Postgres = require("./databases/strategies/Postgres");
const MongoDb = require("./databases/strategies/MongoDb");
const ContextDatabase = require("./databases/ContextDatabase");

const database = new ContextDatabase(new Postgres());
database.isConnected();


