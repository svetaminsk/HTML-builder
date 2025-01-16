const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');

const folder = path.join(__dirname, 'files');
const copyFolder = path.join(__dirname, 'files_copy');
fs.rm(copyFolder, { recursive: true, force: true }, (err) => {
  if (err) console.log(err.message);
  fs.mkdir(copyFolder, { recursive: true }, (err) => {
    if (err) {
      console.log(err);
    }
  });
  fs.readdir(folder, { withFileTypes: true }, function (err, files) {
    for (let i = 0; i < files.length; i += 1) {
      fsPromises.copyFile(
        `${folder}/${files[i].name}`,
        `${copyFolder}/${files[i].name}`,
      );
    }
  });
});
