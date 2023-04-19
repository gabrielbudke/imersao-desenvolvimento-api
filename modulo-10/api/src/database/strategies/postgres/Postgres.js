import InterfaceStrategy from "../InterfaceStrategy.js";
import { Sequelize } from "sequelize";

import databaseConfig from "./config/database-config.js";
import Hero from "./schemas/Hero.js";

class Postgres extends InterfaceStrategy {
    constructor(connection, schema) {
        super();
        this._connection = connection;
        this._schema = schema;
    }

    async isConnected() {
        try {
            await this._connection.authenticate();
            return true;
        } catch (error) {
            console.error("[postgres]: Unable to connect to the database:", error);
            return false;
        }
    }

    create() {
        console.log("[postgres]:", "Created with postgres");
    }

    static async connect() {
        const connection = new Sequelize(databaseConfig);
        return connection;
    }

    static async defineModel(connection, schema) {
        const model = connection.defineModel(
            schema.name, schema.schema, schema.options
        );
    }
}

export default Postgres;