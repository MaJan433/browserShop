import mysql2 from 'mysql2/promise'
export const pool =  mysql2.createPool({
    host: 'localhost',
    user: 'root',
    database: 'portfolio_shop',
    password: 'maria11',
    port: 4900,
    namedPlaceholders: true
});


