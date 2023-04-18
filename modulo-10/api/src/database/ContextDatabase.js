class ContextDatabase {
    constructor(databaseStrategy) {
        this._databaseStrategy = databaseStrategy;
    }

    isConnected() {
        return this._databaseStrategy.isConnected();
    }

    create() {
        return this._databaseStrategy.create();
    }

    read() {
        return this._databaseStrategy.read();
    }

    update() {
        return this._databaseStrategy.update();
    }

    delete() {
        return this._databaseStrategy.update();
    }
}

export default ContextDatabase;