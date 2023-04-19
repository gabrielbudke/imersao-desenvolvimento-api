import ContextDatabase from "./database/ContextDatabase.js";
import Postgres from "./database/strategies/postgres/Postgres.js";
import Hero from "./database/strategies/postgres/schemas/Hero.js";

async function main() {

    const connection = await Postgres.connect();
    const model = await Postgres.defineModel(connection, Hero);
    const database = new ContextDatabase(new Postgres(connection, model));
    const heroes = await database.read({ id: 2 });
    console.log(heroes);
    await database.disconnect();
    // const schema = await Postgres.defineModel(connection, Hero);

}

main();