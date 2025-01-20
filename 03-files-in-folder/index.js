const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'secret-folder');
fs.readdir(file, { withFileTypes: true }, (error, files) => {
  console.log('\nCurrent directory files:');
  if (error) console.log(error);
  else {
    files.forEach((item) => {
      let current = item.name.split('.');
      if (!item.isDirectory()) {
        const pathsToCheck = path.join(file, item.name);
        fs.stat(pathsToCheck, (error, stats) => {
          if (error) console.log(error);
          else {
            console.log(
              `${current[0]} -  ${path.extname(item.name).slice(1)} - ${
                stats.size / 1000
              }kb`,
            );
          }
        });
      }
    });
  }
});
