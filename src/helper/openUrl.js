const {
    exec
} = require('child_process');


//自动打开浏览器
module.exports = url => {
    switch (process.platform) {
        case 'darwin':
            exec(`open ${url}`);
            break;
        case 'win32':
            exec(`start ${url}`);
            break;

    }
}