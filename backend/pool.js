const mysql = require('mysql2/promise');

const pool =  mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'portfolio_shop',
    password: 'maria11',
    port: '4900',
    namedPlaceholders: true
});
console.log('database works!')
module.exports = {
    pool,
}
