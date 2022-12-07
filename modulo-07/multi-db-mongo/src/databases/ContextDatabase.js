class ContextDatabase {
    constructor(databaseStrategy) {
        this._databaseStrategy = databaseStrategy;
    }

    create() {
        return this._databaseStrategy.create();
    }

    connect() {
        return this._databaseStrategy.connect();
    }

    isConnected() {
        return this._databaseStrategy.isConnected();
    }
};

module.exports = ContextDatabase;