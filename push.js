const exec = require('child_process').execSync;
const d = {cwd: __dirname, encoding: 'utf8', stdio: 'inherit'};

try { exec('git remote remove origin', d); } catch(e) {}
exec('git remote add origin https://Crane_NF:ghp_BwE6KzxdRSWrD1lTP8qoymNlIhhckc3IZ5zq@github.com/cranenf/craennf.github.io.git', d);
exec('git push --force -u origin master:main', d);
