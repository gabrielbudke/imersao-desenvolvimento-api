class NotImplementedException extends Error {
    constructor() {
        super("Not implemented exception");
    }
}

class ConnectionException extends Error {
    constructor() {
        super("Could not connect at database");
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
        throw new ConnectionException();
    }
}

module.exports = DatabaseStrategy;