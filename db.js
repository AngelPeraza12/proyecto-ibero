require('dotenv').config();

const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: Process.env.DB_HOST,
    user: Process.env.DB_USER,
    password: Process.env.DB_PASSWORD,
    database: Process.env.DB_NAME

});

connection.connect((err)=> {
    if (err){
        console.log('error conecting to database',err);
        return;
    }    
    
    console.log('Connected to mysql database')
});

module.exports = connection;