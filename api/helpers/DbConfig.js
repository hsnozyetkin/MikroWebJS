const sql = require('mssql');

// MSSQL Config
const config = {
    user: 'mikro',
    password: 'mik7854.',
    server: '192.168.3.100',
    database: 'MikroDB_V15_OZY'
};

module.exports =  {
    sql,
    config
}