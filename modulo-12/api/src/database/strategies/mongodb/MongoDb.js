import mongoose from "mongoose";
import InterfaceStrategy from "../InterfaceStrategy.js";

const STATUS = {
    0: "Disconnected",
    1: "Connected",
    2: "Connecting",
    3: "Disconnecting"
};

class MongoDb extends InterfaceStrategy {
    constructor(connection, schema) {
        super();
        this._connection = connection;
        this._schema = schema;
    }

    isConnected() {
        return STATUS[this._connection.readyState] === "Connected";
    }

    static async connect() {
        try {
            await mongoose.connect("mongodb://gabriel.sousa:admin@localhost:27017/heroes");
            return mongoose.connection;
        } catch (error) {
            throw Error("Could not connect do MongoDB");
        }
    }

    static disconnect() {
        mongoose.connection.close();
    }

    create(hero) {
        return this._schema.create(hero);
    }

    read(query, skip, limit) {
        return this._schema.find(query).limit(limit).skip(skip);
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

}

export default MongoDb;