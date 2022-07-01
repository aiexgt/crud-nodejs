const express = require("express");
const app = express();
const mysql = require("mysql");
require("dotenv").config();

app.use(express.json());

const connection = mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DBDATABASE,
});

connection.connect((err) => {
    if(err) throw err;
    console.log("Conectado a la base de datos");
});

app.get("/", (req, res) => {
    res.send("Hola mundo");
});

app.listen(3000, () => {
    console.log("Servidor en puerto 3000");
})