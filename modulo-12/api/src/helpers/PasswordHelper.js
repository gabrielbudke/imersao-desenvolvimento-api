import bcrypt from "bcrypt";
import { promisify } from "util";

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

export default new PasswordHelper();