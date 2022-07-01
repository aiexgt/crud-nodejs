const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hola mundo");
});

app.listen(3000, () => {
    console.log("Servidor en puerto 3000");
})