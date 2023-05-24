import BaseRoute from "./BaseRoute.js";
import Joi from "joi";
import Boom from "@hapi/boom";
import jwt from "jsonwebtoken";

const USER = {
    username: "generic.user",
    password: "12345678"
};

export default class AuthRoute extends BaseRoute {
    constructor(secret) {
        super();
        this._secret = secret;
    }

    login() {
        return {
            method: "POST",
            path: "/login",
            options: {
                auth: false,
                tags: ["api"],
                description: "Obter token",
                notes: "Realiza a autenticação com usuário e senha.",
                validate: {
                    failAction: (request, h, error) => {
                        throw error;
                    },
                    payload: Joi.object({
                        username: Joi.string().required(),
                        password: Joi.string().required()
                    })
                }
            },
            handler: async (request, h) => {
                const { username, password } = request.payload;

                if (username.toLowerCase() != USER.username || password != USER.password) {
                    return Boom.unauthorized();
                }

                const accessToken = jwt.sign({ id: 1, username }, this._secret);
                return { accessToken };
            }
        };
    }
}