const mysql = require('mysql2');
const values = require('../constantes/const.js');

// Connection configuration
const connectionConfig = {
  host: values.HOST,
  user: values.USERDB,
  database: values.DATABASE,
  port: values.PORTDB,
  password: values.PASSDB
};

// Create a connection
const connection = mysql.createConnection({
  host: connectionConfig.host,
  user: connectionConfig.user,
  password: connectionConfig.password,
  port: connectionConfig.port
});

// Create database if not exists
connection.query(`CREATE DATABASE IF NOT EXISTS ${connectionConfig.database}`, (error) => {
  if (error) {
    console.error('Error creating database:', error);
    return;
  }

  console.log('Database created or already exists');

  // Use the newly created or existing database
  const dbConnection = mysql.createConnection(connectionConfig);

  // Create 'vendedor' table
  dbConnection.query(`
    CREATE TABLE IF NOT EXISTS vendedor (
      numeroVendedor INT PRIMARY KEY,
      nombreVendedor VARCHAR(200)
    )
  `, (error) => {
    if (error) {
      console.error('Error creating vendedor table:', error);
      return;
    }
    console.log('vendedor table created');
  });

  // Create 'comprador' table
  dbConnection.query(`
    CREATE TABLE IF NOT EXISTS comprador (
      idComprador INT PRIMARY KEY,
      nombreComprador VARCHAR(200)
    )
  `, (error) => {
    if (error) {
      console.error('Error creating comprador table:', error);
      return;
    }
    console.log('comprador table created');
  });

  // Create 'TipoProducto' table
  dbConnection.query(`
    CREATE TABLE IF NOT EXISTS TipoProducto (
      idTipoProducto INT PRIMARY KEY,
      descripcionProducto VARCHAR(500)
    )
  `, (error) => {
    if (error) {
      console.error('Error creating TipoProducto table:', error);
      return;
    }
    console.log('TipoProducto table created');
  });

  // Create 'Producto' table
  dbConnection.query(`
    CREATE TABLE IF NOT EXISTS Producto (
      numeroVendedor INT,
      idComprador INT,
      idTipoProducto INT,
      precioCompra INT,
      PRIMARY KEY (numeroVendedor, idComprador, idTipoProducto),
      FOREIGN KEY (numeroVendedor) REFERENCES vendedor(numeroVendedor),
      FOREIGN KEY (idComprador) REFERENCES comprador(idComprador),
      FOREIGN KEY (idTipoProducto) REFERENCES TipoProducto(idTipoProducto)
    )
  `, (error) => {
    if (error) {
      console.error('Error creating Producto table:', error);
      return;
    }
    console.log('Producto table created');
    dbConnection.end();
  });
});

const pool = mysql.createPool(connectionConfig);

module.exports = pool;
