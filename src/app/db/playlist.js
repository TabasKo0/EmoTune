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
      userid TEXT NOT NULL UNIQUE,
      playlists TEXT DEFAULT "[]",
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

async function addPlaylist(userid, playlists) {
  return new Promise((resolve, reject) => {
    if (!userid || !playlists) {
      reject(new Error('User ID and playlists are required'));
      return;
    }

    // First, check if the user exists
    db.get('SELECT userid FROM playlists WHERE userid = ?', [userid], (err, row) => {
      if (err) {
        console.error('Error checking user:', err);
        reject(err);
        return;
      }

      if (!row) {
        // User does not exist, create a new entry
        db.run(
          'INSERT INTO playlists (userid, playlists) VALUES (?, ?)',
          [userid, playlists],
          function (err) {
            if (err) {
              console.error('Error creating user:', err);
              reject(err);
            } else {
              console.log('New user added, ID:', userid);
              resolve({ success: true });
            }
          }
        );
      } else {
        // User exists, update the playlists
        db.run(
          'UPDATE playlists SET playlists = ? WHERE userid = ?',
          [playlists, userid],
          function (err) {
            if (err) {
              console.error('Error updating playlists:', err);
              reject(err);
            } else {
              if (this.changes > 0) {
                console.log('Playlists updated for user:', userid);
                resolve({ success: true });
              } else {
                console.log('No playlists updated for user:', userid);
                resolve({ success: false });
              }
            }
          }
        );
      }
    });
  });
}

function getPlaylists(id) {
  return new Promise((resolve, reject) => {
    db.all(
      'SELECT * FROM playlists WHERE userid=?',
      [id],
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