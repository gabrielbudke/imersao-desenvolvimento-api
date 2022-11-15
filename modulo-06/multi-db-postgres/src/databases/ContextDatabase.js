class ContextDatabase {
    constructor(databaseStrategy) {
        this._databaseStrategy = databaseStrategy;
    }

    setDatabaseStrategy(databaseStrategy) {
        this._databaseStrategy = databaseStrategy;
    }

    create(hero) {
        return this._databaseStrategy.create(hero);
    }

    read(params) {
        return this._databaseStrategy.read(params);
    }

    update(id, hero) {
        return this._databaseStrategy.update(id, hero);
    }

    deleteAll() {
        return this._databaseStrategy.deleteAll();
    }

    isConnected() {
        return this._databaseStrategy.isConnected();
    }

    connect() {
        return this._databaseStrategy.connect();
    }
}

module.exports = ContextDatabase;