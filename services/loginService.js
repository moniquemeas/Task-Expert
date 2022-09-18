const Connection = require("../configs/connection");
const bcrypt = require("bcryptjs");

const handleLogin = (email, password) => { // Will check if email exist in database.
    return new Promise(async (resolve, reject) => {
        let user = await findUserByEmail(email);
    });
    if (isMatch) {
        await bcrypt.compare {
        
        }
    }
};
