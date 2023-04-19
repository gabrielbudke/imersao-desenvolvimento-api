class ContextDatabase {
    constructor(databaseStrategy) {
        this._databaseStrategy = databaseStrategy;
    }

    isConnected() {
        return this._databaseStrategy.isConnected();
    }

    create(hero) {
        return this._databaseStrategy.create(hero);
    }

    read(heroId) {
        return this._databaseStrategy.read(heroId);
    }

    update() {
        return this._databaseStrategy.update();
    }

    delete() {
        return this._databaseStrategy.update();
    }

    disconnect() {
        return this._databaseStrategy.disconnect();
    }
}

export default ContextDatabase;