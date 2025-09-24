const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbFile = path.join(__dirname, 'playlists.sqlite');
const db = new sqlite3.Database(dbFile);

// Table creation (call once at startup)
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS playlists (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      url TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

// Export generic query helpers
function run(sql, params = [], callback) {
  db.run(sql, params, function (err) {
    callback(err, this);
  });
}

function all(sql, params = [], callback) {
  db.all(sql, params, callback);
}

module.exports = { run, all };