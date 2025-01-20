const path = require('path');
const fs = require('fs');
const fsPromises = fs.promises;

const dirMain = path.join(__dirname, 'project-dist');
const dirMainAssets = path.join(__dirname, 'project-dist/assets/');
const dirAddAssets = path.join(__dirname, 'assets/');
const output = fs.createWriteStream(
  path.join(__dirname, 'project-dist/style.css'),
);
const indexHtml = fs.createWriteStream(
  path.join(__dirname, 'project-dist/index.html'),
);
const dirStyle = path.join(__dirname, 'styles/');
//const template = path.join(__dirname, 'template.html');
const components = path.join(__dirname, 'components/');
let count = 0;
let arr = [];

fsPromises.mkdir(dirMain, { recursive: true }, (error) => {
  if (error) console.log(error);
});
fsPromises.mkdir(dirMainAssets, { recursive: true }, (error) => {
  if (error) console.log(error);
});

fs.readdir(dirAddAssets, { withFileTypes: true }, function (error, items) {
  for (let i = 0; i < items.length; i += 1) {
    if (items[i].isDirectory()) {
      fsPromises
        .mkdir(
          `${dirMainAssets}/${items[i].name}/`,
          { recursive: true },
          (error) => {
            if (error) console.log(error);
          },
        )
        .then(() => {
          fs.readdir(
            `${dirAddAssets}/${items[i].name}`,
            { withFileTypes: true },
            function (error, items2) {
              for (let j = 0; j < items2.length; j += 1) {
                fsPromises.copyFile(
                  dirAddAssets + items[i].name + '/' + items2[j].name,
                  dirMainAssets + items[i].name + '/' + items2[j].name,
                );
              }
            },
          );
        });
    }
  }
});

fs.readdir(dirStyle, { withFileTypes: true }, function (error, items) {
  for (let i = 0; i < items.length; i += 1) {
    fs.stat(dirStyle + items[i].name, function () {
      if (
        items[i].isFile() &&
        path.extname(dirStyle + items[i].name).toString() === '.css'
      ) {
        const stream = fs.createReadStream(dirStyle + items[i].name, {
          encoding: 'utf-8',
        });
        stream.on('readable', function () {
          let data = stream.read();
          if (data != null) {
            arr[i] = data;
            output.write(arr[i]);
          }
        });
        stream.on('end', () => {});
      }
    });
  }
});

let arr2 = [];
fs.readdir(components, { withFileTypes: true }, function (error, items) {
  const streamTemplate = fs.createReadStream('./06-build-page/template.html', {
    encoding: 'utf-8',
  });
  streamTemplate.on('readable', function () {
    let dataTemplate = streamTemplate.read();
    for (let i = 0; i < items.length; i += 1) {
      fs.stat(components + items[i].name, function () {
        if (items[i].isFile()) {
          const stream = fs.createReadStream(components + items[i].name, {
            encoding: 'utf-8',
          });
          stream.on('readable', function () {
            let data = stream.read();
            if (data != null) arr2[i] = data;
            let indef = '{{' + path.parse(items[i].name).name + '}}';
            if (data != null && dataTemplate != null)
              dataTemplate = dataTemplate.replace(indef, arr2[i]);
            if (i == items.length - 1 && dataTemplate != null && count == 0) {
              indexHtml.write(dataTemplate);
            }
          });
        }
      });
    }
  });
});
