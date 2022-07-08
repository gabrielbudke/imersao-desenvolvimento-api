const { Command } = require("commander");
const Hero = require("./hero");
const database = require("./database");

const program = new Command();

const main = async () => {

    program
        .option("-n, --name <value>", "hero name")
        .option("-p, --power <value>", "hero power")
        .option("-i, --id <value>", "hero id")
        .option("-c, --create", "creating a new hero")
        .option("-u, --update", "creating a new hero")
        .option("-r, --read", "reading a new hero")
        .option("-d, --delete", "deleating a new hero")
        .version("0.0.1");

    program.parse();

    try {
        const options = program.opts();

        // Create a hero
        if (options.create) {
            if (!options.name || !options.power) {
                console.error("Name and power is required to create a hero!");
                return;
            }

            const hero = new Hero(options);
            const result = await database.create(hero);
            if (!result) {
                console.error("[create] Houve um problema ao cadastrar herói!");
                return;
            }

            console.log("[create] Herói cadastrado com sucesso!");
            return;
        }

        // Read a hero or all heroes
        if (options.read) {
            const hero = await database.read();
            console.log("[read]", hero);
            return;
        }

        // Update a hero
        if (options.update) {
            const id = parseInt(options.id);
            const { name, power } = new Hero(options);

            // Para remover as propriedades que estiverem como undefined ou null
            const heroToString = JSON.stringify({ name, power });
            const heroToObject = JSON.parse(heroToString);

            const result = await database.update(id, heroToObject);
            if (!result) {
                console.log("[update] Houve um erro ao atualizar herói!");
                return;
            }

            console.log("[update] Herói atualizado com sucesso!");
            return;
        }

        // Delete a hero
        if (options.delete) {
            try {
                const isHeroDeleted = await database.delete(parseInt(options.id));
                console.log("[delete] Herói excluído com sucesso!");
                return;
            } catch (error) {
                console.error(`[delete] Houve um problema em excluir o herói! ${error}`);
            }
        }

    } catch (error) {
        console.error(`[error] Houve um erro na execução do programa: ${error}`);
    }

};

main();