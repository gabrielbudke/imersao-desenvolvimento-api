import ContextDatabase from "./database/ContextDatabase.js";
import Postgres from "./database/strategies/postgres/Postgres.js";
import Hero from "./database/strategies/postgres/schemas/Hero.js";


async function main() {

    const connection = await Postgres.connect();
    // console.log(await connection.authenticate());
    const database = new ContextDatabase(new Postgres(connection));
    Postgres.defineModel();

}

main();