class ContextDatabase {
    constructor(databaseStrategy) {
        this._databaseStrategy = databaseStrategy;
    }

    create() {
        return this._databaseStrategy.create();
    }
};

module.exports = ContextDatabase;