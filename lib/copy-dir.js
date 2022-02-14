const fs = require('fs/promises');
const path = require('path');
const copyFile = require('./copy-file');

async function copyDir(src, dest) {
  // mk dest dir
  // read src (list of file names)
  // write each file to dest dir (parallel)

  await fs.mkdir(dest);
  const files = await fs.readdir(src);
  await Promise.all(files.map(async file => {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);
    return await copyFile(srcPath, destPath);
  }));

  // return fs.mkdir(dest)
  //   .then(() => {
  //     return fs.readdir(src);
  //   })
  //   .then(files => {
  //     return Promise.all(files.map(file => {
  //       const srcPath = path.join(src, file);
  //       const destPath = path.join(dest, file);
  //       return copyFile(srcPath, destPath);
  //     }));
  //   });

  // const [files] = await Promise.all([
  //   fs.readdir(src),
  //   fs.mkdir(dest),
  // ]);

  // await Promise.all(files.map(async file => {
  //   const srcPath = path.join(src, file);
  //   const destPath = path.join(dest, file);
  //   return await copyFile(srcPath, destPath);
  // }));
  
  // return Promise.all([
  //   fs.readdir(src),
  //   fs.mkdir(dest),
  // ])
  //   .then(([files]) => {
  //     return Promise.all(files.map(file => {
  //       const srcPath = path.join(src, file);
  //       const destPath = path.join(dest, file);
  //       return copyFile(srcPath, destPath);
  //     }));
  //   });
}

module.exports = copyDir;
