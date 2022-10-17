const DatabaseStrategy = require("./DatabaseStrategy");
const { Sequelize, DataTypes } = require("sequelize");

class Postgres extends DatabaseStrategy {
    constructor() {
        super();
        this._connection = null;
        this._heroes = null;
    }

    async isConnected() {
        try {
            await this._connection.authenticate();
            console.log("[postgres-connection]: Connection has been established successfully.");
            return true;
        } catch (error) {
            console.error("[postgres-connection]: Unable to connect to the database:", error.message);
            return false;
        }
    }

    async create(hero) {
        const { dataValues } = await this._heroes.create(hero);
        console.log("[postgres-create]: Hero created in Postgres database");
        return dataValues;
    }

    async defineModel() {
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

        await this._heroes.sync();
    }

    async connect() {
        this._connection = new Sequelize({
            dialect: "postgres",
            host: "localhost",
            database: "heroes",
            username: "admin",
            password: "admin",
            logging: false
        });

        await this.defineModel();
    }
}

module.exports = Postgres;