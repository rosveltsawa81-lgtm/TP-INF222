const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const DB_PATH = path.join(__dirname, '../blog.db');

const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error("Erreur connexion :", err.message);
  } else {
    console.log("connecté à SQLite");

    // Activer WAL
    db.run("PRAGMA journal_mode = WAL;");

    // Création de la table
    db.run(`
      CREATE TABLE IF NOT EXISTS articles (
        id        INTEGER PRIMARY KEY AUTOINCREMENT,
        titre     TEXT    NOT NULL,
        contenu   TEXT    NOT NULL,
        auteur    TEXT    NOT NULL,
        date      TEXT    NOT NULL DEFAULT (date('now')),
        categorie TEXT    NOT NULL DEFAULT 'Général',
        tags      TEXT    NOT NULL DEFAULT '[]'
      )
    `, (err) => {
      if (err) {
        console.error("Erreur création table :", err.message);
      } else {
        console.log("Table 'articles' prête");
      }
    });
  }
});

module.exports = db;