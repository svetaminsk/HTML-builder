const fs = require('fs');
const path = require('path');

const styleFolder = path.join(__dirname, 'styles');
const distFolder =
  path.join(__dirname, 'project-dist/bundle.css') ||
  fs.writeFile('./05-merge-styles/project-dist/bundle.css');

fs.readdir(styleFolder, (error, data) => {
  if (error) {
    console.error(error);
  }
  fs.unlink(distFolder, () => {});
  data.forEach((element) => {
    if (error) {
      console.error(error);
    }
    if (path.extname(element) === '.css') {
      fs.readFile(
        path.join('05-merge-styles', 'styles', element),
        (error, data) => {
          if (error) {
            console.error(error);
          }
          fs.appendFile(distFolder, data, (error) => {
            if (error) {
              console.error(error);
            }
          });
        },
      );
    }
  });
});
