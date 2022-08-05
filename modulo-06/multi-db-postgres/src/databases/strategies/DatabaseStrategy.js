class NotImplementedException extends Error {
    constructor() {
        super("Not implemented exception");
    }
}

class DatabaseStrategy {
    create() {
        throw new NotImplementedException();
    }

    read() {
        throw new NotImplementedException();
    }

    upsdate() {
        throw new NotImplementedException();
    }

    delete() {
        throw new NotImplementedException();
    }

    isConnected() {
        throw new NotImplementedException();
    }
}

module.exports = DatabaseStrategy;