import { expect } from "@hapi/code";
import { init } from "../server.js";

describe("API", () => {

    let server;
    before(async () => {
        server = await init();
    });

    // after(async () => {
    //     await server.stop();
    // });

    it("should read heroes at /heroes", async () => {
        const LIMIT = 10;
        const response = await server.inject({
            method: "GET",
            url: `/heroes?skip=0&limit=${LIMIT}`
        });
        expect(response.statusCode).to.equal(200);
    });

    it("should create hero at /heroes", async () => {
        const response = await server.inject({
            method: "POST",
            url: "/heroes",
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
            url: `/heroes?skip=0&limit=${LIMIT}`
        });

        expect(response.result.message).to.equals(`"limit" must be a number`);
        expect(response.statusCode).to.equal(400);
    });

    it("should read a hero filtered by name", async () => {
        const LIMIT = 1;
        const NAME = "Flash";
        const response = await server.inject({
            method: "GET",
            url: `/heroes?skip=0&limit=${LIMIT}&name=${NAME}`
        });

        expect(response.result).to.have.length(1);
        expect(response.statusCode).to.equal(200);
    });

});