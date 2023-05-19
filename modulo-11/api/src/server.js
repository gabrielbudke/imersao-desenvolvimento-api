import Hapi from "@hapi/hapi";
import Vision from "@hapi/vision";
import Inert from "@hapi/inert";
import HapiSwagger from "hapi-swagger";
import ContextDatabase from "./database/ContextDatabase.js";
import MongoDB from "./database/strategies/mongodb/MongoDb.js";
import HeroSchema from "./database/strategies/mongodb/schemas/Hero.js";
import HeroRoute from "./routes/HeroRoutes.js";
import mapRoutes from "./utils/routing-mapping.js";


const server = Hapi.server({
    port: 3000,
    host: "localhost"
});

// const start = async () => {

//     const connection = await MongoDB.connect();
//     const database = new ContextDatabase(new MongoDB(connection, HeroSchema));

//     const methods = HeroRoute.methods();
//     const heroRoutes = new HeroRoute(database);

//     const routes = mapRoutes(heroRoutes, methods);
//     server.route(routes);

//     return server;
//     await server.start();
//     console.log("[server]", `Server running at: ${server.info.uri}`);
//     return server;
// };

const configServer = async () => {

    const connection = await MongoDB.connect();
    const database = new ContextDatabase(new MongoDB(connection, HeroSchema));

    const swaggerOptions = {
        info: {
            title: "API Heroes - Imersão Desenvolvimento de APIS",
            version: "v1.0"
        }
    };

    await server.register([
        Vision, Inert,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);

    const methods = HeroRoute.methods();
    const heroRoutes = new HeroRoute(database);
    const routes = mapRoutes(heroRoutes, methods);
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