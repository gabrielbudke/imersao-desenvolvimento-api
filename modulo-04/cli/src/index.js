const { Command } = require("commander");
const Hero = require("./hero");
const database = require("./database");

const program = new Command();

const main = async () => {
    program.version("v1");
    program
        .option("-n, --name <value>", "hero name")
        .option("-p, --power <value>", "hero power")
        .option("-i, --id <value>", "hero id")
        .option("-c, --create", "creating a new hero")
        .option("-r, --read", "reading a new hero")
        .option("-d, --delete", "deleating a new hero");

    program.parse(process.argv);

    try {
        const options = program.opts();

        if (options.create) {
            //options.id = Date.now();
            const hero = new Hero(options);
            const result = await database.create(hero);
            if (!result) {
                console.error("Houve um problema ao cadastrar herói!");
            }

            console.log("Herói cadastrado com sucesso!");
            return;
        }

        if (options.read) {
            const hero = await database.read();
            console.log(hero);
            return;
        }

        if (options.delete) {
            try {
                const isHeroDeleted = await database.delete(parseInt(options.id));
                console.log("Herói excluído com sucesso!");
                return;
            } catch (error) {
                console.error(`Houve um problema em excluir o herói! ${error}`);
            }
        }

    } catch (error) {

    }


};

main();