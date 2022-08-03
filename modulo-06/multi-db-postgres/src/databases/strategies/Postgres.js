const DatabaseStrategy = require("./DatabaseStrategy");

class Postgres extends DatabaseStrategy {
    constructor() {
        super();
    }

    create(hero) {
        console.log("[postgres-create]: Hero created in Postgres database");
    }
}

module.exports = Postgres;