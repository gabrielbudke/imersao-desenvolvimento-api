import { config } from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

import Hapi from "@hapi/hapi";
import Vision from "@hapi/vision";
import Inert from "@hapi/inert";
import HapiSwagger from "hapi-swagger";
import HapiAuth from "hapi-auth-jwt2";

import ContextDatabase from "./database/ContextDatabase.js";
import MongoDB from "./database/strategies/mongodb/MongoDb.js";
import HeroSchema from "./database/strategies/mongodb/schemas/Hero.js";
import HeroRoute from "./routes/HeroRoutes.js";
import mapRoutes from "./utils/routing-mapping.js";
import AuthRoute from "./routes/AuthRoute.js";
import Postgres from "./database/strategies/postgres/Postgres.js";
import User from "./database/strategies/postgres/schemas/User.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const env = process.env.NODE_ENV === "development" ? ".env.dev" : ".env";
const configPath = path.join(__dirname, `${env}`);
// console.log("[configPath]", configPath);

config({
    path: configPath
});

const JWT_SECRET = process.env.USER_JWT_KEY;

const server = Hapi.server({
    //port: 3333,
    port: process.env.USER_SERVER_PORT,
    host: "0.0.0.0"
});

const configServer = async () => {

    const connectionMongo = await MongoDB.connect();
    const databaseMongo = new ContextDatabase(new MongoDB(connectionMongo, HeroSchema));

    const connectionPostgres = await Postgres.connect();
    const userSchema = await Postgres.defineModel(connectionPostgres, User);
    const databasePostgres = new ContextDatabase(new Postgres(connectionPostgres, userSchema));

    const routes = [
        ...mapRoutes(new HeroRoute(databaseMongo), HeroRoute.methods()),
        ...mapRoutes(new AuthRoute(databasePostgres, JWT_SECRET), AuthRoute.methods())
    ];

    const swaggerOptions = {
        info: {
            title: "API Heroes - Imersão Desenvolvimento de APIS",
            version: "v1.0"
        }
    };

    await server.register([
        HapiAuth, Vision, Inert,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);

    server.auth.strategy("jwt", "jwt", {
        key: JWT_SECRET,
        validate: async (decoded, request, h) => {
            // verifica no banco se o usuário está ativo
            const [user] = await databasePostgres.read({
                id: decoded.id
            });

            if (!user) {
                return { isValid: false };
            }

            return {
                isValid: true
            };
        }
    });

    server.auth.default("jwt");
    server.route(routes);

    return server;
};

const init = async () => {
    const server = await configServer();




    await server.initialize();
    return server;
};

const start = async () => {
    const server = await configServer();
    await server.start();
    console.log("[server]", `Server running at: ${server.info.uri}`);
};

export { init, start };