const DatabaseStrategy = require("../DatabaseStrategy");
const { Sequelize, DataTypes } = require("sequelize");

class Postgres extends DatabaseStrategy {
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
            return false;
        }
    }

    async create(hero) {
        const { dataValues } = await this._schema.create(hero);
        return dataValues;
    }

    async read(query = {}) {
        // const heroes = await this._heroes.findAll({
        //     raw: true,
        //     where: params
        // });
        const heroes = await this._schema.findAll({
            raw: true,
            where: query
        });

        return heroes;
    }

    update(id, hero) {
        return this._schema.update(hero, {
            where: {
                id
            }
        });
    }

    delete(id) {
        const query = id ? { id } : {};
        return this._schema.destroy({
            where: query
        });
    }

    static async defineModel(connection, schema) {
        const model = connection.define(
            schema.name, schema.schema, schema.options
        );
        await model.sync();
        return model;
    }

    static async connect() {
        const connection = new Sequelize({
            dialect: "postgres",
            host: "localhost",
            database: "heroes",
            username: "admin",
            password: "admin",
            logging: false,
        });

        return connection;
    }
}

module.exports = Postgres;