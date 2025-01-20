const fs = require('fs');
const path = require('path');

const styleFolder = path.join(__dirname, 'styles');
const distFolder = fs.createWriteStream(
  path.join(__dirname, 'project-dist/bundle.css'),
);

fs.readdir(styleFolder, (error, files) => {
  files.forEach((item) => {
    fs.stat(styleFolder + '/' + item, (error, stats) => {
      if (stats.isFile() && path.extname(item) === '.css') {
        fs.readFile(styleFolder + '/' + item, 'utf-8', (error, data) => {
          if (error) throw error;
          distFolder.write(data);
        });
        if (error) throw error;
      }
    });
  });
});
