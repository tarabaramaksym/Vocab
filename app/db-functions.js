const sqlite3 = require('sqlite3').verbose();
const vocabulary = require('./data/vocab.json');

function importVocabularyFromJson() {
  const db = new sqlite3.Database('./data/data.db');
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS vocabulary (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      word TEXT,
      translation TEXT
    )`);

    db.all(`SELECT * FROM vocabulary`, (err, data) => {
      console.log({
        err,
        data
      })
      if (err || data.length) {
        return;
      }
      console.log('here');
      const insert = db.prepare(`INSERT INTO vocabulary (word, translation) VALUES (?, ?)`);
      for (const key of Object.keys(vocabulary)) {
        insert.run(key, vocabulary[key]);
      }
      insert.finalize();
      db.close();
    });
  });
}

async function addWord(word, translation) {
  try {
    const db = new sqlite3.Database('./data/data.db');
    const result = db.run(`INSERT INTO vocabulary (word, translation) VALUES (?, ?)`, [word, translation]);
    db.close();
    return result.lastID;
  } catch (err) {
    console.error(err.message);
    return null;
  }
}

async function getAllWords() {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database('./data/data.db');
    db.all(`SELECT * FROM vocabulary`, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
      db.close();
    });
  });
}

function isRowValid(row) {
  return Object.keys(row).length;
}

module.exports = {
  addWord,
  getAllWords,
  isRowValid,
  importVocabularyFromJson
}