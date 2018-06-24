const {
    createGzip,
    createDeflate
} = require('zlib');

module.exports = (rs, req, res) => {
    const accpetEncoding = req.headers['accept-encoding'];
    if (!accpetEncoding || !accpetEncoding.match(/\b(gzip|deflate)\b/)) {
        return rs;
    } else if (accpetEncoding.match(/\bgzip\b/)) {
        res.setHeader('Content-Encoding', 'gzip');
        return rs.pipe(createGzip());
    } else if (accpetEncoding.match(/\bdeflate\b/)) {
        res.setHeader('Content-Encoding', 'deflate');
        return rs.pipe(createDeflate());
    }
};