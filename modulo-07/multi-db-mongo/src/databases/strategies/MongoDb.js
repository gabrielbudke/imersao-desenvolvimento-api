const DatabaseStrategy = require("./DatabaseStrategy");
const mongoose = require("mongoose");

const STATUS = {
    0: "Disconnected",
    1: "Connected",
    2: "Connecting",
    3: "Disconnecting"
}

class MongoDb extends DatabaseStrategy {
    constructor() {
        super();
        this._connection = null;
        this._hero = null;
    }

    isConnected() {

        return STATUS[this._connection.readyState];
        return true;
    }
    
    create() {
        console.log("[INFO]: Created with MongoDB");
    }

    read() {}

    defineModel() {
        const schema = mongoose.Schema({
            name: {
                type: String,
                required: true
            }, 
            power: {
                type: String,
                required: true
            },
            insertedAt: {
                type: Date,
                default: new Date()
            }
        });

        this._hero = mongoose.model("Hero", schema);
    }

    async connect() {
        try {
            mongoose.set('strictQuery', true);
            await mongoose.connect("mongodb://gabriel.sousa:admin@localhost:27017/heroes");
            console.log("[INFO][DATABASE]: Connected do database with success!");
            this._connection = mongoose.connection;
        } catch (error) {
            console.error("[ERROR][DATABASE]: Fail to connect to database with message:", error.message);    
        }
    }

}

module.exports = MongoDb;