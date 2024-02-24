"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServeAsset = exports.FileAPI = void 0;
const fs = require("fs");
const path = require("path");
const responses = require("./responses");
const BufferCache_1 = require("./BufferCache");
const ContentType_1 = require("./ContentType");
const Handler_1 = require("./Handler");
const server_1 = require("../utils/server");
class FileAPI {
    constructor() { }
    readFileSync(path) {
        return fs.readFileSync(path);
    }
    readFile(path) {
        return new Promise((resolve, reject) => {
            fs.readFile(path, (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            });
        });
    }
    existsSync(path) {
        return fs.existsSync(path);
    }
}
exports.FileAPI = FileAPI;
FileAPI.INSTANCE = new FileAPI();
class ServeAsset extends Handler_1.Handler {
    constructor(cacheAgeSeconds = process.env.ASSET_CACHE_MAX_AGE || 0, cacheAssets = (0, server_1.isProduction)(), fileApi = FileAPI.INSTANCE) {
        super();
        this.cacheAgeSeconds = cacheAgeSeconds;
        this.cacheAssets = cacheAssets;
        this.fileApi = fileApi;
        this.cache = new BufferCache_1.BufferCache();
        const styles = fileApi.readFileSync('build/styles.css');
        this.cache.set('build/styles.css', styles);
        const compressed = fileApi.readFileSync('build/styles.css.gz');
        this.cache.set('build/styles.css.gz', compressed);
        const brotli = fileApi.readFileSync('build/styles.css.br');
        this.cache.set('build/styles.css.br', brotli);
    }
    async get(req, res, _ctx) {
        if (req.url === undefined) {
            responses.internalServerError(req, res, new Error('no url on request'));
            return;
        }
        const path = req.url.substring(1);
        const supportedEncodings = this.supportedEncodings(req);
        const toFile = this.toFile(path, supportedEncodings);
        if (toFile.file === undefined) {
            return responses.notFound(req, res);
        }
        const file = toFile.file;
        const buffer = this.cacheAssets ? this.cache.get(file) : undefined;
        if (buffer !== undefined) {
            if (req.headers['if-none-match'] === buffer.hash) {
                responses.notModified(res);
                return;
            }
            res.setHeader('Cache-Control', 'must-revalidate');
            res.setHeader('ETag', buffer.hash);
        }
        else if (this.cacheAssets === false && req.url !== '/main.js' && req.url !== '/main.js.map') {
            res.setHeader('Cache-Control', 'max-age=' + this.cacheAgeSeconds);
        }
        const contentType = ContentType_1.ContentType.getContentType(file);
        if (contentType !== undefined) {
            res.setHeader('Content-Type', contentType);
        }
        if (toFile.encoding !== undefined) {
            res.setHeader('Content-Encoding', toFile.encoding);
        }
        if (buffer !== undefined) {
            res.setHeader('Content-Length', buffer.buffer.length);
            res.end(buffer.buffer);
            return;
        }
        try {
            const data = await this.fileApi.readFile(file);
            res.setHeader('Content-Length', data.length);
            res.end(data);
            if (this.cacheAssets === true) {
                this.cache.set(file, data);
            }
        }
        catch (err) {
            console.log(err);
            responses.internalServerError(req, res, 'Cannot serve ' + path);
        }
    }
    toMainFile(urlPath, encodings) {
        let file = `build/${urlPath}`;
        let encoding;
        if (encodings.has('br')) {
            encoding = 'br';
            file += '.br';
        }
        else if (encodings.has('gzip')) {
            encoding = 'gzip';
            file += '.gz';
        }
        if (!(0, server_1.isProduction)() && !this.fileApi.existsSync(file)) {
            encoding = undefined;
            file = `build/${urlPath}`;
        }
        return { file, encoding };
    }
    toServiceWorkerFile(urlPath) {
        const file = `build/src/client/${urlPath}`;
        return { file };
    }
    toFile(urlPath, encodings) {
        switch (urlPath) {
            case 'assets/index.html':
            case 'assets/Prototype.ttf':
            case 'assets/Prototype-ru.ttf':
            case 'assets/Prototype-pl.ttf':
            case 'assets/futureforces.ttf':
                return { file: urlPath };
            case 'styles.css':
                if (encodings.has('br')) {
                    return { file: 'build/styles.css.br', encoding: 'br' };
                }
                if (encodings.has('gzip')) {
                    return { file: 'build/styles.css.gz', encoding: 'gzip' };
                }
                return { file: 'build/styles.css' };
            case 'main.js':
            case 'main.js.map':
                return this.toMainFile(urlPath, encodings);
            case 'sw.js':
                return this.toServiceWorkerFile(urlPath);
            case 'favicon.ico':
                return { file: 'assets/favicon.ico' };
            default:
                if (urlPath.endsWith('.png') || urlPath.endsWith('.jpg') || urlPath.endsWith('.json')) {
                    const assetsRoot = path.resolve('./assets');
                    const resolvedFile = path.resolve(path.normalize(urlPath));
                    if (resolvedFile.startsWith(assetsRoot)) {
                        return { file: resolvedFile };
                    }
                }
        }
        return {};
    }
    supportedEncodings(req) {
        const result = new Set();
        for (const header of String(req.headers['accept-encoding']).split(', ')) {
            if (header === 'br' || header === 'gzip') {
                result.add(header);
            }
        }
        return result;
    }
}
exports.ServeAsset = ServeAsset;
ServeAsset.INSTANCE = new ServeAsset();
