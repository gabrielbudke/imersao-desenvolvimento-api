const { expect } = require("@hapi/code");
const passwordHelper = require("../helpers/PasswordHelper.js");

xdescribe("Password Helper", () => {
    it("should generate a hash from a password", async () => {
        const hash = await passwordHelper.hashPassword("admin123");
        console.log("[hash]", hash);
        expect(hash).to.exist();
    });

    it("should compare password with hash", async () => {
        const hash = await passwordHelper.hashPassword("admin123");
        const compare = await passwordHelper.comparePassword("admin123", hash);
        expect(compare).to.be.true();
    });
});