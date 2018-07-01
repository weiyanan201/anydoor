module.exports = {
    hostname: 'localhost',
    port: 3000,
    root: process.cwd(),
    compress: /\.(html|js|css|md)/,
    cache: {
        maxAge: 600,
        expires: true,
        cacheControl: true,
        lastModified: true,
        etag: true,
    }
}