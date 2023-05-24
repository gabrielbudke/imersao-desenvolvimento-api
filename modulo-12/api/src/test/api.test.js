import { expect } from "@hapi/code";
import { init } from "../server.js";

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJnZW5lcmljLnVzZXIiLCJpYXQiOjE2ODQ4OTU4ODR9.9AKouKXjGlsKirbdwykgEetGzWHS-LilkaofBX87WM4";
const MOCK_HERO = {
    name: "Gavião-Arqueiro",
    power: "Flechas"
};

describe("API", () => {

    let server;
    before(async () => {
        server = await init();
        const response = await server.inject({
            method: "POST",
            url: "/heroes",
            headers: {
                Authorization: TOKEN
            },
            payload: MOCK_HERO
        });
        MOCK_HERO.id = response.result._id.toString();
    });

    // after(async () => {
    //     await server.stop();
    // });

    it("should get a token", async () => {
        const response = await server.inject({
            method: "POST",
            url: "/login",
            payload: {
                username: "generic.user",
                password: "12345678"
            }
        });

        expect(response.statusCode).to.equal(200);

    });

    it("should read heroes at /heroes", async () => {
        const LIMIT = 10;
        const response = await server.inject({
            method: "GET",
            headers: {
                Authorization: TOKEN
            },
            url: `/heroes?skip=0&limit=${LIMIT}`
        });
        expect(response.statusCode).to.equal(200);
    });

    it("should create hero at /heroes", async () => {
        const response = await server.inject({
            method: "POST",
            url: "/heroes",
            headers: {
                Authorization: TOKEN
            },
            payload: {
                name: "Flash",
                power: "Velocidade"
            }
        });

        expect(response.statusCode).to.equal(201);
    });

    it("should not read a limit of heroes because of wrong limit parameter", async () => {
        const LIMIT = "AEEE";
        const response = await server.inject({
            method: "GET",
            headers: {
                Authorization: TOKEN
            },
            url: `/heroes?skip=0&limit=${LIMIT}`
        });

        expect(response.result.message).to.equals(`"limit" must be a number`);
        expect(response.statusCode).to.equal(400);
    });

    it("should read a hero filtered by name", async () => {
        const LIMIT = 1;
        const NAME = MOCK_HERO.name;
        const response = await server.inject({
            method: "GET",
            headers: {
                Authorization: TOKEN
            },
            url: `/heroes?skip=0&limit=${LIMIT}&name=${NAME}`
        });

        expect(response.result).to.have.length(1);
        expect(response.statusCode).to.equal(200);
    });

    it("should update a part of hero", async () => {
        const response = await server.inject({
            method: "PATCH",
            url: `/heroes/${MOCK_HERO.id}`,
            headers: {
                Authorization: TOKEN
            },
            payload: {
                name: "Arqueiro-Verde",
                power: "Flechas"
            }
        });

        expect(response.statusCode).to.equal(200);
    });

    it("should not update a hero because id is incorrect", async () => {
        const incorrectId = "646421981674d96bf2af0ed0";
        const response = await server.inject({
            method: "PATCH",
            url: `/heroes/${incorrectId}`,
            headers: {
                Authorization: TOKEN
            },
            payload: {
                name: "Arqueiro-Verde",
                power: "Flechas"
            }
        });

        expect(response.statusCode).to.equal(412);
        expect(response.result.message).to.equals(`Could not find Hero with id ${incorrectId}`);
    });

    it("should delete a hero", async () => {
        const id = MOCK_HERO.id;
        const response = await server.inject({
            method: "DELETE",
            headers: {
                Authorization: TOKEN
            },
            url: `/heroes/${id}`
        });

        expect(response.result.message).to.equals(`Hero deleted with success`);
    });

});