import BaseRoute from "./BaseRoute.js";
import Joi from "joi";

export default class HeroRoute extends BaseRoute {
    constructor(database) {
        super();
        this._database = database;
    }

    index() {
        return {
            method: "GET",
            path: "/heroes",
            options: {
                validate: {
                    failAction: (request, h, error) => {
                        throw error;
                    },
                    query: Joi.object({
                        skip: Joi.number().integer().default(0),
                        limit: Joi.number().integer().min(1).max(100).default(10),
                        name: Joi.string().min(3).max(50)
                    })
                }
            },
            handler: async (request, h) => {
                try {
                    const { skip, limit, ...filters } = request.query;
                    const query = filters ? {
                        name: { $regex: `.*${filters.name}.*` }
                    } : {};

                    const heroes = await this._database.read(query, skip, limit);
                    return heroes;
                } catch (error) {
                    return h.response({ message: error.message }).code(400);
                }
            }
        };
    }

    create() {
        return {
            method: "POST",
            path: "/heroes",
            handler: async (request, h) => {
                const hero = await this._database.create(request.payload);
                return h.response(hero).code(201);
            }
        };
    }
}