const { getPeople } = require("./service");
const assert = require("assert");
const nock = require("nock");

describe("Star Wars Tests", function () {
    this.beforeAll(() => {
        // Simulação do retorno da api
        const response = {
            count: 1,
            next: null,
            previous: null,
            results: [
                {
                    name: 'R2-D2',
                    height: '96',
                    mass: '32',
                    hair_color: 'n/a',
                    skin_color: 'white, blue',
                    eye_color: 'red',
                    birth_year: '33BBY',
                    gender: 'n/a',
                    homeworld: 'https://swapi.dev/api/planets/8/',
                    vehicles: [],
                    starships: [],
                    created: '2014-12-10T15:11:50.376000Z',
                    edited: '2014-12-20T21:17:50.311000Z',
                    url: 'https://swapi.dev/api/people/3/'
                }
            ]
        };

        const params = new URLSearchParams({ search: "r2" });
        const scope = nock("https://swapi.dev/api")
            .get("/people")
            .query(params).reply(200, response);

    });

    it("Should search R2-D2", async function () {
        const expected = [{ name: "R2-D2", weight: "32" }];
        const response = await getPeople("r2");
        assert.deepEqual(response, expected);
    });
});