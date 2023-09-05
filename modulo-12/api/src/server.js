const { config } = require("dotenv");
const { fileURLToPath } = require("url");
const path = require("path");

const Hapi = require("@hapi/hapi");
const Vision = require("@hapi/vision");
const Inert = require("@hapi/inert");
const HapiSwagger = require("hapi-swagger");
const HapiAuth = require("hapi-auth-jwt2");

const ContextDatabase = require("./database/ContextDatabase.js");
const MongoDB = require("./database/strategies/mongodb/MongoDb.js");
const Postgres = require("./database/strategies/postgres/Postgres.js");

const HeroSchema = require("./database/strategies/mongodb/schemas/Hero.js");
const User = require("./database/strategies/postgres/schemas/User.js");

const HeroRoute = require("./routes/HeroRoutes.js");
const AuthRoute = require("./routes/AuthRoute.js");
const UtilRoutes = require("./routes/UtilRoutes.js");

const mapRoutes = require("./utils/routing-mapping.js");

const env = process.env.NODE_ENV === "development" ? ".env.dev" : ".env";
const configPath = path.join(__dirname, `${env}`);

config({
    path: configPath
});

const JWT_SECRET = process.env.USER_JWT_KEY;

const server = Hapi.server({
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
        ...mapRoutes(new AuthRoute(databasePostgres, JWT_SECRET), AuthRoute.methods()),
        ...mapRoutes(new UtilRoutes(), UtilRoutes.methods())
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

module.exports = { init, start };