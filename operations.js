const mysql = require("mysql");

function insert(connection, data, callback){
    let insertQuery = `INSERT INTO personas (primerNombre, primerApellido) VALUES (?,?)`;
    let query = mysql.format(insertQuery, [data.primerNombre, data.primerApellido]);
    connection.query(query, function(err, result){
        if(err) throw err;
        callback(result);
        connection.end();
    });
}

function read(connection, callback){
    connection.query(`SELECT * FROM personas`, function(err, result){
        if(err) throw err;
        callback(result);
        connection.end();
    });
}

function update(connection, data, callback){
    let updateQuery = `UPDATE personas SET primerNombre = ?, primerApellido = ? WHERE id = ?`;
    let query = mysql.format(updateQuery, [data.primerNombre, data.primerApellido, data.id]);
    connection.query(query, function(err, result){
        if(err) throw err;
        callback(result);
        connection.end();
    });
}

function remove(connection, data, callback){
    let removeQuery = `DELETE FROM personas WHERE id = ?`;
    let query = mysql.format(removeQuery, [data.id]);
    connection.query(query, function(err, result){
        if(err) throw err;
        callback(result);
        connection.end();
    });
}

module.exports = { insert, read, update, remove };