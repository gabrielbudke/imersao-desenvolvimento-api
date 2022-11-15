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
            return true;
        } catch (error) {
            return false;
        }
    }

    async create(hero) {
        const { dataValues } = await this._heroes.create(hero);
        return dataValues;
    }

    async read(query = {}) {
        // const heroes = await this._heroes.findAll({
        //     raw: true,
        //     where: params
        // });
        const heroes = await this._heroes.findAll({
            raw: true,
            where: query
        });

        return heroes;
    }

    update(id, hero) {
        return this._heroes.update(hero, {
            where: {
                id
            }
        });
    }

    delete(id) {
        const query = id ? { id } : {};
        return this._heroes.destroy({
            where: query
        });
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
            logging: false,
        });

        await this.defineModel();
    }
}

module.exports = Postgres;