import BaseRoute from "./BaseRoute.js";

export default class HeroRoute extends BaseRoute {
    constructor(database) {
        super();
        this._database = database;
    }

    index() {
        return {
            method: "GET",
            path: "/heroes",
            handler: async (request, h) => {
                try {
                    const { skip, limit, ...filters } = request.query;
                    console.log("filters", filters);
                    // const query = filters ? filters : {};

                    if (isNaN(skip)) {
                        throw Error("Skip is missing or invalid!");
                    }

                    if (isNaN(limit)) {
                        throw Error("Limit is missing or invalid!");
                    }

                    const heroes = await this._database.read(filters, skip, limit);
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