const DatabaseStrategy = require("../DatabaseStrategy");
const mongoose = require("mongoose");

const STATUS = {
    0: "Disconnected",
    1: "Connected",
    2: "Connecting",
    3: "Disconnecting"
};

class MongoDb extends DatabaseStrategy {
    constructor(connection, schema) {
        super();
        this._connection = connection;
        this._schema = schema;
    }

    isConnected() {
        return STATUS[this._connection.readyState];
    }

    create(hero) {
        return this._schema.create(hero);
    }

    read(query) {
        return this._schema.find(query).limit(10);
    }

    update(id, hero) {
        return this._schema.updateOne({ _id: id }, hero);
    }

    delete(id) {
        return this._schema.deleteOne({ _id: id });
    }

    deleteAll() {
        return this._schema.deleteMany();
    }

    static async connect() {
        try {
            mongoose.set('strictQuery', true);
            await mongoose.connect("mongodb://gabriel.sousa:admin@localhost:27017/heroes");
            return mongoose.connection;
            // this.defineModel();
        } catch (error) {
            console.error("[ERROR][DATABASE]: Fail to connect to database with message:", error.message);
        }
    }

    disconnect() {
        this._connection.close();
    }

}

module.exports = MongoDb;