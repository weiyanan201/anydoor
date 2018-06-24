const http = require('http');
const chalk = require('chalk');
const path = require('path');

const conf = require('./config/defaultConfig');
const rout = require('./helper/router');

const server = http.createServer((req, res) => {

    const url = req.url;
    const filePath = path.join(conf.root, url);
    rout(req,res,filePath);
 
});

server.listen(conf.port, conf.hostname, () => {
    const addr = `http://${conf.hostname}:${conf.port}`;
    console.log(`Server started at ${chalk.green(addr)}`);

})