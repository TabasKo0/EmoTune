const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const dbPath = path.join(process.cwd(), 'playlists.db');

console.log('Database will be created at:', dbPath);

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Database connected successfully!');
  }
});

// Create the table when database opens
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS playlists (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      url TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      console.error('Error creating table:', err);
    } else {
      console.log('Table created or already exists');
    }
  });
});

function addPlaylist(name, description, url) {
  return new Promise((resolve, reject) => {
    if (!name || !url) {
      reject(new Error('Name and url are required'));
      return;
    }
    
    db.run(
      'INSERT INTO playlists (name, description, url) VALUES (?, ?, ?)',
      [name, description || '', url],
      function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID });
        }
      }
    );
  });
}

function getPlaylists() {
  return new Promise((resolve, reject) => {
    db.all(
      'SELECT * FROM playlists ORDER BY created_at DESC',
      [],
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      }
    );
  });
}

module.exports = { addPlaylist, getPlaylists };