const express = require("express");
const app = express();
const mysql = require("mysql");
require("dotenv").config();

app.use(express.json());

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});

app.get("/", (req, res) => {
    res.send("Hola mundo");
});

app.listen(3000, () => {
    console.log("Servidor en puerto 3000");
})