const bcrypt = require("bcrypt");
const { promisify } = require("util");

const hashAsync = promisify(bcrypt.hash);
const compareAsync = promisify(bcrypt.compare);

class PasswordHelper {
    hashPassword(password) {
        return hashAsync(password, Number(process.env.USER_SALT_PWD));
    }

    comparePassword(password, hash) {
        return compareAsync(password, hash);
    }
}

module.exports = new PasswordHelper();