import BaseRoute from "./BaseRoute.js";
import Joi from "joi";
import Boom from "@hapi/boom";

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
                tags: ["api"],
                description: "Deve listar os heróis",
                notes: "Pode paginar os resultados e filtrar por nome.",
                validate: {
                    failAction: (request, h, error) => {
                        throw error;
                    },
                    query: Joi.object({
                        skip: Joi.number().integer().default(0),
                        limit: Joi.number().integer().min(1).max(100).default(10),
                        name: Joi.string().min(3).max(50).optional()
                    })
                }
            },
            handler: async (request, h) => {
                try {
                    const { skip, limit, ...filters } = request.query;
                    // const query = filters ? {
                    //     name: { $regex: `.*${filters.name}.*` }
                    // } : {};

                    const query = Object.keys(filters).length !== 0 ? {
                        name: { $regex: `.*${filters.name}.*` }
                    } : {};

                    const heroes = await this._database.read(query, skip, limit);
                    return heroes;
                } catch (error) {
                    console.error("[heroRoute:index]", error.message);
                    return Boom.notFound();
                }
            }
        };
    }

    create() {
        return {
            method: "POST",
            path: "/heroes",
            options: {
                tags: ["api"],
                description: "Deve cadastrar herói",
                notes: "Deve cadastras herói por nome e poder.",
                validate: {
                    failAction: (request, h, error) => {
                        throw error;
                    },
                    payload: Joi.object({
                        name: Joi.string().min(3).max(30).required(),
                        power: Joi.string().min(3).max(30).required()
                    }).label("createHero")
                }
            },
            handler: async (request, h) => {
                try {
                    const hero = await this._database.create(request.payload);
                    return h.response(hero).code(201);
                } catch (error) {
                    console.error("[heroRoute:create]", error.message);
                    return Boom.notFound();
                }
            }
        };
    }

    update() {
        return {
            method: ["PUT", "PATCH"],
            path: "/heroes/{id}",
            options: {
                tags: ["api"],
                description: "Deve atualizar herói pelo id",
                notes: "Pode atualizar qualquer campo do herói.",
                validate: {
                    failAction: (request, h, error) => {
                        throw error;
                    },
                    params: Joi.object({
                        id: Joi.string().required()
                    }),
                    payload: Joi.object({
                        name: Joi.string().min(3).max(30),
                        power: Joi.string().min(3).max(30)
                    }).label("updateHero")
                }
            },
            handler: async (request, h) => {
                try {
                    const { id } = request.params;
                    const hero = request.payload;
                    const response = await this._database.update(id, hero);
                    if (response.modifiedCount === 0) {
                        return Boom.preconditionFailed(`Could not find Hero with id ${id}`);
                    }
                    return { message: "Hero updated with success!" };
                } catch (error) {
                    console.error("[heroRoute:update]", error.message);
                    return Boom.notFound();
                }
            }
        };
    }

    delete() {
        return {
            method: "DELETE",
            path: "/heroes/{id}",
            options: {
                tags: ["api"],
                description: "Deve remover o herói por id",
                notes: "Deve remover o herói por um id válido.",
                validate: {
                    failAction: (request, h, error) => {
                        throw error;
                    },
                    params: Joi.object({
                        id: Joi.string().required()
                    })
                }
            },
            handler: async (request, h) => {
                try {
                    const { id } = request.params;
                    const hero = await this._database.delete(id);
                    if (hero.deletedCount === 0) {
                        return Boom.preconditionFailed(`Could not find Hero with id ${id}`);
                    }
                    return { message: "Hero deleted with success" };
                } catch (error) {
                    console.error("[heroRoute:delete]", error.message);
                    return Boom.notFound("Could not delete hero");
                }
            }
        };
    }
}