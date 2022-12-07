const DatabaseStrategy = require("./DatabaseStrategy");

class MongoDb extends DatabaseStrategy {
    create() {
        console.log("[INFO]: Created with MongoDB");
    }
}

module.exports = MongoDb;