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

    async read(params = {}) {
        // const heroes = await this._heroes.findAll({
        //     raw: true,
        //     where: params
        // });
        const hero = await this._heroes.findOne({
            raw: true,
            where: params
        });

        return hero;
    }

    update(id, hero) {
        return this._heroes.update(hero, {
            where: {
                id
            }
        });
    }

    async deleteAll() {
        await this._heroes.destroy({
            truncate: true
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
            logging: true,
        });

        await this.defineModel();
    }
}

module.exports = Postgres;