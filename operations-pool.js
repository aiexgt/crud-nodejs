const mysql = require("mysql");

function insertPool(pool, data, callback) {
  let insertQuery = `INSERT INTO personas (primerNombre, primerApellido) VALUES (?,?)`;
  let query = mysql.format(insertQuery, [
    data.primerNombre,
    data.primerApellido,
  ]);
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query(query, function (err, result) {
      if (err) throw err;
      callback(result);
      connection.release();
    });
  });
}

function readPool(pool, callback) {
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query(`SELECT * FROM personas`, function (err, result) {
      if (err) throw err;
      callback(result);
      connection.release();
    });
  });
}

function updatePool(pool, data, callback) {
  let updateQuery = `UPDATE personas SET primerNombre = ?, primerApellido = ? WHERE id = ?`;
  let query = mysql.format(updateQuery, [
    data.primerNombre,
    data.primerApellido,
    data.id,
  ]);
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query(query, function (err, result) {
      if (err) throw err;
      callback(result);
      connection.release();
    });
  });
}

function removePool(pool, data, callback) {
  let removeQuery = `DELETE FROM personas WHERE id = ?`;
  let query = mysql.format(removeQuery, [data.id]);
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query(query, function (err, result) {
      if (err) throw err;
      callback(result);
      connection.release();
    });
  });
}

module.exports = { insertPool, readPool, updatePool, removePool };
