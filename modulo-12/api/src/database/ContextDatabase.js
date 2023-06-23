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

    read(heroId, skip, limit) {
        return this._databaseStrategy.read(heroId, skip, limit);
    }

    update(id, hero, upsert = false) {
        return this._databaseStrategy.update(id, hero, upsert);
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