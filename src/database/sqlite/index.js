// Import do banco de dados.
const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');
const { open } = require('sqlite');

// Imports auxiliares
const path = require('path');

async function sqliteConnection() {
  // Conexão com o DB
  const database = await open({
    filename: path.resolve(__dirname, '..', 'database.db'),

    // Comunicação com DB
    driver: sqlite3.Database,
  });

  return database;
}

module.exports = sqliteConnection;
