const { run, all } = require('./db');

function insertPlaylist({ name, description, url }, callback) {
  if (!name || !url) {
    return callback(new Error('Name and url are required.'));
  }
  run(
    'INSERT INTO playlists (name, description, url) VALUES (?, ?, ?)',
    [name, description || '', url],
    (err, result) => {
      if (err) return callback(err);
      callback(null, { id: result.lastID });
    }
  );
}

function getAllPlaylists(callback) {
  all(
    'SELECT * FROM playlists ORDER BY created_at DESC',
    [],
    (err, rows) => {
      if (err) return callback(err);
      callback(null, rows);
    }
  );
}


module.exports = { insertPlaylist, getAllPlaylists };