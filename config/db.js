const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'todo',
    password: 'postgres',
})

module.exports = pool;