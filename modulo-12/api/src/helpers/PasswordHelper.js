import bcrypt from "bcrypt";
import { promisify } from "util";

const hashAsync = promisify(bcrypt.hash);
const compareAsync = promisify(bcrypt.compare);

class PasswordHelper {
    hashPassword(password) {
        return hashAsync(password, 3);
    }

    comparePassword(password, hash) {
        return compareAsync(password, hash);
    }
}

export default new PasswordHelper();