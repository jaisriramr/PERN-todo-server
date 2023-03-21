const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "JAI@1926",
    host: "localhost",
    post: 5432,
    database: "perntodo"
})

module.exports = pool;