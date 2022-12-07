class NotImplementedException extends Error {
    constructor() {
        super("Not implemented exception");
    }
} 

class DatabaseStrategy {
    create() {
        throw new NotImplementedException();
    }
}

module.exports = DatabaseStrategy;