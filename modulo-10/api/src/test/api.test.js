import { expect } from "@hapi/code";
import { start } from "../server.js";

describe("API", () => {
    let server;

    before(async () => {
        server = await start();
    });

    // after(async () => {
    //     await server.stop();
    // });

    it("should read heroes at /heroes", async () => {
        const response = await server.inject({
            method: "GET",
            url: "/heroes"
        });
        expect(response.statusCode).to.equal(200);
    });

    it("should read a limit of heroes", async () => {
        const LIMIT = 3;

        const response = await server.inject({
            method: "GET",
            url: `/heroes?skip=0&limit=${LIMIT}&name=Flash`
        });

        expect(response.statusCode).equal(200);
        expect(response.result).length(LIMIT);
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
});