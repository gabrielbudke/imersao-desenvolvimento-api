const DatabaseStrategy = require("./DatabaseStrategy");
const { Sequelize } = require("sequelize");

class Postgres extends DatabaseStrategy {
    constructor() {
        super();
        this._connection = null;
        this._heroes = null;
        this._connect();
    }

    async isConnected() {
        try {
            await this._connection.authenticate();
            return true;
            console.log("[postgres-connection]: Connection has been established successfully.");
        } catch (error) {
            console.error("[postgres-connection]: Unable to connect to the database:", error.message);
            return false;
        }

        await this._connection.close();
    }

    create(hero) {
        console.log("[postgres-create]: Hero created in Postgres database");
    }

    defineModel() {
        this._heroes = this._connection.define("Heroes", {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            power: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }, {
            tableName: "tb_heroes",
            freezeTableName: false,
            timestamps: false
        });

        // await Heroes.sync();
    }

    _connect() {
        this._connection = new Sequelize({
            dialect: "postgres",
            host: "localhost",
            database: "heroes",
            username: "admin",
            password: "admin",
            logging: false
        });
    }
}

module.exports = Postgres;