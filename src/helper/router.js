const fs = require('fs');
const path = require('path');
const promisify = require('util').promisify;
const HandleBars = require('handlebars');
const config = require('../config/defaultConfig');

const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
const compress = require('./compress');
const range = require('./range');

const tplPath = path.join(__dirname, '../template/dir.tpl');
const source = fs.readFileSync(tplPath, 'utf-8');
const template = HandleBars.compile(source);

//大法师阿斯顿发斯蒂芬
module.exports = async function (req, res, filePath) {
    try {
        const newLocal = await stat(filePath);
        const stats = newLocal;
        if (stats.isFile()) {

            res.setHeader('Content-Type', 'text/plain');
            let rs;
            const {
                code,
                start,
                end
            } = range(stats.size, req, res);
            if (code === 200) {
                res.statusCode = 200;
                rs = fs.createReadStream(filePath);
            } else {
                res.statusCode = 206;
                rs = fs.createReadStream(filePath, {
                    start,
                    end
                })
            }
            if (filePath.match(config.compress)) {
                rs = compress(rs, req, res);
            }
            rs.pipe(res);
        } else if (stats.isDirectory()) {

            const files = await readdir(filePath)
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            const dir = path.relative(config.root, filePath);
            const data = {
                files,
                title: path.basename(filePath),
                dir: dir ? `/${dir}` : ''
            }

            res.end(template(data));

        }

    } catch (error) {
        console.error(error);
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end(`${filePath} is not directory or file `);
    }
}