const fs = require('fs/promises');

function copyFile(src, dest) {
  return fs.readFile(src)
    .then(file => {
      return fs.writeFile(dest, file);
    })
    .catch(err => {
      if(err.code === 'ENOENT') {
        throw new Error(`bad file: ${src}`);
      }
      throw err;
    });
}

module.exports = copyFile;
