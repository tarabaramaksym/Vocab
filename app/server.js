const express = require('express');
const sqlite3 = require('sqlite3').verbose();
var cors = require('cors')
const { importVocabularyFromJson } = require('./db-functions');
const app = express();
app.use(express.json());
const port = 81;

app.use(cors())

const routes = require('./routes.js');
routes(app);

const db = new sqlite3.Database('data/data.db', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    const row = db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='vocabulary'", (err, data) => {
      if (!data) {
        db.run(`CREATE TABLE vocabulary (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          word TEXT NOT NULL,
          translation TEXT NOT NULL
        )`);
      }
    });

    importVocabularyFromJson('./data/vocab.csv');
  }
});

db.close();

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}.`);
});
