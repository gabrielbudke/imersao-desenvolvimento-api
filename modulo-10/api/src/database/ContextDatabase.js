class ContextDatabase {
    constructor(databaseStrategy) {
        this._databaseStrategy = databaseStrategy;
    }

    setDatabaseStrategy(databaseStrategy) {
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

    update(id, hero) {
        return this._databaseStrategy.update(id, hero);
    }

    delete(id) {
        return this._databaseStrategy.delete(id);
    }

    deleteAll() {
        return this._databaseStrategy.deleteAll();
    }

    disconnect() {
        return this._databaseStrategy.disconnect();
    }
}

export default ContextDatabase;