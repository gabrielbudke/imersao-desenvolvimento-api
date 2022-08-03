const DatabaseStrategy = require("./DatabaseStrategy");

class MongoDb extends DatabaseStrategy {
    constructor() {
        super();
    }

    create(hero) {
        console.log("[mongodb-create]: Hero created in MongoDb database");
    }
}

module.exports = MongoDb;