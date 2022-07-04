const express = require("express");
const app = express();
const mysql = require("mysql");
require("dotenv").config();

const { insert, read, update, remove } = require("./operations");

const { insertPool, readPool, updatePool, removePool, searchPool } = require("./operations-pool");

app.use(express.json());

const connection = mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DBDATABASE,
});

const pool = mysql.createPool({
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

app.get("/insert", (req, res) => {
    insert(connection, { primerNombre: "Lionel", primerApellido: "Messi" }, 
    (result) => {
        res.json(result);
    });
});

app.get("/insert-pool", (req, res) => {
    insertPool(pool, { primerNombre: "Caga", primerApellido: "Dales" }, 
    (result) => {
        res.json(result);
    });
});

app.get("/read", (req, res) => {
    read(connection, (result) => {
        res.json(result);
    })
})

app.get("/read-pool", (req, res) => {
    readPool(pool, (result) => {
        res.json(result);
    })
});

app.get("/search-pool", (req, res) => {
    searchPool(pool, {
        id: 1
    }, (result) => {
        res.json(result);
    })
});

app.get("/update", (req, res) => {
    update(connection, { primerNombre: "Juana", primerApellido: "Cubana", id: 1 }, 
    (result) => {
        res.json(result);
    });
});

app.get("/update-pool", (req, res) => {
    updatePool(pool, { primerNombre: "Patricia", primerApellido: "Estrella", id: 2 }, 
    (result) => {
        res.json(result);
    });
});

app.get("/remove", (req, res) => {
    remove(connection, { id: 5 }, 
    (result) => {
        res.json(result);
    });
});

app.get("/remove-pool", (req, res) => {
    removePool(pool, { id: 2 }, 
    (result) => {
        res.json(result);
    });
});

app.listen(3000, () => {
    console.log("Servidor en puerto 3000");
})