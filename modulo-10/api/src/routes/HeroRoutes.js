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
            handler: (request, h) => {
                try {
                    const { name, skip, limit } = request.query;
                    const heroes = this._database.read({ name }, skip, limit);
                    return heroes;

                } catch (error) {
                    return h.response('404 Error! Page Not Found!').code(404);
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