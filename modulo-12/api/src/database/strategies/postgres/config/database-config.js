module.exports = {
    dialect: "postgres",
    host: process.env.USER_POSTGRES_HOST,
    database: process.env.USER_POSTGRES_DATABASE,
    port: Number(process.env.USER_POSTGRES_PORT),
    username: process.env.USER_POSTGRES_USERNAME,
    password: process.env.USER_POSTGRES_PASSWORD,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    logging: false
};