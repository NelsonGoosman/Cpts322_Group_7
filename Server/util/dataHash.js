const bcrypt = require('bcrypt');

const dataHash = async (data, saltRounds = 10) => {
    try {
        const hashedData = await bcrypt.hash(data, saltRounds);
        return hashedData;
    }catch(err){
        throw err;
    }
};
const verifyHash = async (unhashed, hashed) => {
    try {
        const isValid = await bcrypt.compare(unhashed, hashed);
        return isValid;
    }catch(err){
        throw err;
    }
};
module.exports = { dataHash, verifyHash };
