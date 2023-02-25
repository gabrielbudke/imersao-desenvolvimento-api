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

    update(id, hero) {
        return this._databaseStrategy.update(id, hero);
    }

    delete(id) {
        return this._databaseStrategy.delete(id);
    }

    deleteAll() {
        return this._databaseStrategy.deleteAll();
    }

    connect() {
        return this._databaseStrategy.connect();
    }

    disconnect() {
        return this._databaseStrategy.disconnect();
    }

    isConnected() {
        return this._databaseStrategy.isConnected();
    }
};

module.exports = ContextDatabase;