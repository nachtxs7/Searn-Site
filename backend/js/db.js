const { Pool } = require('pg')

const pool = new Poll({
    user: 'postgres',
    host: 'localhost',
    database: 'Searn_site',
    password: '1234567',
    port: '5432',
})

module.exports = {
    query: (text, params) => pool.query(text, params),
};