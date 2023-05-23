import { expect } from "@hapi/code";
import { init } from "../server.js";

let server = {};
describe("Authentication", function () {

    before(async () => {
        server = await init();
    });

    it("should get a token", async () => {
        const response = await server.inject({
            method: "POST",
            url: "/heroes/auth",
            payload: {
                username: "generic.user",
                password: "12345678"
            }
        });

        expect(response.statusCode).to.equal(200);

    });

});