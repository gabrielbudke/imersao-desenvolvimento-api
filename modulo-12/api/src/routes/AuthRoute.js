const BaseRoute = require("./BaseRoute.js");
const Joi = require("joi");
const Boom = require("@hapi/boom");
const jwt = require("jsonwebtoken");
const passwordHelper = require("../helpers/PasswordHelper.js");

const USER = {
    username: "generic.user",
    password: "12345678"
};

class AuthRoute extends BaseRoute {
    constructor(database, secret) {
        super();
        this._database = database;
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

                const [user] = await this._database.read({
                    username: username.toLowerCase()
                });

                if (!user) {
                    return Boom.notFound("User not found!");
                }

                const passwordMatch = await passwordHelper.comparePassword(password, user.password);

                if (!passwordMatch) {
                    return Boom.unauthorized("User or pass invalid!");
                }

                const accessToken = jwt.sign({ id: user.id, username }, this._secret);
                return { accessToken };
            }
        };
    }
}

module.exports = AuthRoute;