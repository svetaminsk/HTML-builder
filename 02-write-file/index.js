const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;
const output = fs.createWriteStream(path.join(__dirname, 'text.txt'));
stdout.write('Write something:\n');
stdin.on('data', (data) => {
  if (data.toString().includes('exit')) process.exit();
  output.write(data);
});
process.on('SIGINT', () => process.exit());
process.on('exit', () => stdout.write('Goodbye!'));
