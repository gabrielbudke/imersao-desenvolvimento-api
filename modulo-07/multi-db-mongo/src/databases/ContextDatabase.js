class ContextDatabase {
    constructor(databaseStrategy) {
        this._databaseStrategy = databaseStrategy;
    }

    create(hero) {
        return this._databaseStrategy.create(hero);
    }

    read(query) {
        return this._databaseStrategy.read(query);
    }

    update() {
        return this._databaseStrategy.update();
    }

    removeAll() {
        return this._databaseStrategy.removeAll();
    }

    connect() {
        return this._databaseStrategy.connect();
    }

    isConnected() {
        return this._databaseStrategy.isConnected();
    }
};

module.exports = ContextDatabase;