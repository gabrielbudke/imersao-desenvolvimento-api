const { deepEqual, ok } = require("assert");
const database = require("../src/database.js");

const DEFAULT_HERO = {
    id: 1,
    name: "Flash",
    power: "Speed"
};

const DEFAULT_HERO_UPDATE = {
    id: 2,
    name: "Lanterna Verde",
    power: "Energia do anel"
};

describe("Suite de teste da aplicação CLI", () => {
    before(async () => {
        await database.create(DEFAULT_HERO);
        await database.create(DEFAULT_HERO_UPDATE);
    });

    it("Deve cadastrar um herói no arquivo", async () => {
        const expected = DEFAULT_HERO;
        const actual = await database.create(DEFAULT_HERO);
        deepEqual(actual, expected);
    });

    it("Deve pesquisar um herói no arquivo através id", async function () {
        const expected = DEFAULT_HERO;
        const [actual] = await database.read(DEFAULT_HERO.id);
        deepEqual(actual, expected);
    });

    it("Deve remover um herói do arquivo", async () => {
        const expected = true;
        const actual = await database.remove(DEFAULT_HERO.id);
        deepEqual(actual, expected);
    });

    it("Deve atualizar um herói por id", async () => {
        const hero = {
            name: "Batman",
            power: "Dinheiro"
        };

        const expected = {
            ...DEFAULT_HERO_UPDATE,
            name: "Batman",
            power: "Dinheiro"
        };

        await database.update(DEFAULT_HERO_UPDATE.id, hero);
        const [actual] = await database.read(DEFAULT_HERO_UPDATE.id);
        deepEqual(actual, expected);
    });

});
