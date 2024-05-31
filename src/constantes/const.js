const dotevn = require('dotenv');

dotevn.config();

module.exports = {
    PORT: parseInt(process.env.RUN_PORT) || process.argv[3] || 8080,
    NODE_ENV: process.env.NODE_ENV,
    HOST: process.env.HOST,
    USERDB: process.env.USERDB,
    DATABASE: process.env.DATABASE,
    PASSDB: process.env.PASSDB,
}