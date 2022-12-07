const MongoDb = require("./databases/strategies/MongoDb");
const ContextDatabase = require("./databases/ContextDatabase");

const mongoContext = new ContextDatabase(new MongoDb());
mongoContext.create();