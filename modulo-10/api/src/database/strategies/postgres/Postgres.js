import InterfaceStrategy from "../InterfaceStrategy.js";
import { Sequelize } from "sequelize";

import databaseConfig from "./config/database-config.js";

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
}

export default Postgres;