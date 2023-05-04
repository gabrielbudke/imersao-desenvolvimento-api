import Hapi from "@hapi/hapi";
import ContextDatabase from "./database/ContextDatabase.js";
import MongoDB from "./database/strategies/mongodb/MongoDb.js";
import HeroSchema from "./database/strategies/mongodb/schemas/Hero.js";
import HeroRoute from "./routes/HeroRoutes.js";
import mapRoutes from "./utils/routing-mapping.js";

const server = Hapi.server({
    port: 3000,
    host: "localhost"
});

const start = async () => {

    const connection = await MongoDB.connect();
    const database = new ContextDatabase(new MongoDB(connection, HeroSchema));

    const methods = HeroRoute.methods();
    const heroRoutes = new HeroRoute(database);

    const routes = mapRoutes(heroRoutes, methods);
    server.route(routes);

    await server.start();
    console.log("[server]", `Server running at: ${server.info.uri}`);
    return server;
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

export { start };