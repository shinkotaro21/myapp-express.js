const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'todos',
    password: 'postgres',
})

module.exports = pool;