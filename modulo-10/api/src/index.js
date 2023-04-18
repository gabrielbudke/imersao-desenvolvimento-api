import ContextDatabase from "./database/ContextDatabase.js";
import Postgres from "./database/strategies/postgres/Postgres.js";


async function main() {

    const connection = await Postgres.connect();
    // console.log(await connection.authenticate());
    const database = new ContextDatabase(new Postgres(connection));
    console.log(await database.isConnected());
}

main();