const {
    cache
} = require('../config/defaultConfig');

function refreshRes(status, res) {
    const {
        maxAge,
        expires,
        cacheControl,
        lastModified,
        etag
    } = cache;

    if (expires) {
        res.setHeader('Expires', new Date(Date.now() + maxAge * 1000).toUTCString());
    }

    if (cacheControl) {
        res.setHeader('Cache-Control', `public,max-age=${maxAge}`);
    }

    if (lastModified) {
        res.setHeader('Last-Modified', status.mtime.toUTCString());
    }

    if (etag) {
        res.setHeader('ETag', `${status.size}-${status.mtime}`)
    }
}

module.exports = function isFresh(status, req, res) {
    refreshRes(status, res);
    const lastModified = req.headers['if-modified-since'];
    const etag = req.headers['if-none-match'];
    if (!lastModified && !etag) {
        return false;
    }
    if (lastModified && lastModified !== res.getHeader('Last-Modified')) {
        return false;
    }

    if (etag && etag !== res.getHeader('ETag')) {
        return false;
    }

    return true;
}