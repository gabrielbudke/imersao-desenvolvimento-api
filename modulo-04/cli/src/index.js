const { Command } = require("commander");
const Hero = require("./hero");
const database = require("./database");

const program = new Command();

const main = async () => {
    program.version("v1");

    program
        .option("-n, --name <value>", "hero name")
        .option("-p, --power <value>", "hero power")
        .option("-c --create", "creating a new hero");

    program.parse(process.argv);

    try {
        const options = program.opts();

        if (options.create) {
            options.id = Date.now();
            const hero = new Hero(options);
            console.log(hero);
            const result = await database.create(hero);
            console.log("result", result);
        }

    } catch (error) {

    }


};

main();