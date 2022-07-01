const { readFile, writeFile } = require("fs");
const { promisify } = require("util");

const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

class Database {

    constructor() {
        this.FILE = "src/heroes.json";
    }

    async getAllDataFromFile() {
        const file = await readFileAsync(this.FILE, "utf8");
        return JSON.parse(file.toString());
    }

    async writeFile(data) {
        await writeFileAsync(this.FILE, JSON.stringify(data));
        return true;
    }

    async read(heroId) {
        const heroes = await this.getAllDataFromFile();
        const heroesFilteredByID = heroes.filter(hero => heroId ? (hero.id === heroId) : true);
        return heroesFilteredByID;
    }

    async create({ id, name, power }) {
        const data = await this.getAllDataFromFile();

        const hero = {
            id: id ? id : Date.now(),
            name,
            power
        };

        data.push(hero);
        await this.writeFile(data);
        return hero;
    }

    async delete(heroId) {
        if (!heroId) {
            return await this.writeFile([]);
        }

        const heroes = await this.getAllDataFromFile();
        const heroIndex = heroes.findIndex(hero => hero.id === parseInt(heroId));
        if (heroIndex === -1) {
            throw Error(`[error] O herói com id ${heroId} não foi encontrado!`);
        }

        heroes.splice(heroIndex, 1);

        return await this.writeFile(heroes);
    }

    async update(heroId, hero) {
        const data = await this.getAllDataFromFile();
        const index = data.findIndex(hero => hero.id === parseInt(heroId));

        if (index === -1) {
            throw Error(`Hero not found with id ${heroId}`);
        }

        const heroToUpdate = data[index];

        const heroUpdated = {
            ...heroToUpdate,
            ...hero
        };

        data.splice(index, 1);
        await this.writeFile([
            ...data,
            heroUpdated
        ]);

        //return false;
    }
}

module.exports = new Database();