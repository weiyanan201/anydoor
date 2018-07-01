const http = require('http');
const chalk = require('chalk');
const path = require('path');

const conf = require('./config/defaultConfig');
const rout = require('./helper/router');
const openUrl = require('./helper/openUrl');

class Server {

    constructor(config) {
        this.config = Object.assign({}, conf, config);
    }

    start() {
        const server = http.createServer((req, res) => {

            const url = req.url;
            const filePath = path.join(this.config.root, url);
            rout(req, res, filePath, this.config);

        });

        server.listen(this.config.port, this.config.hostname, () => {
            const addr = `http://${this.config.hostname}:${this.config.port}`;
            console.log(`Server started at ${chalk.green(addr)}`);
            openUrl(addr);
        })
    }
}


module.exports = Server;