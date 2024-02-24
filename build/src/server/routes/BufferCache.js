"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BufferCache = void 0;
const crypto = require("crypto");
class BufferCache {
    constructor() {
        this.storage = new Map();
    }
    get(key) {
        return this.storage.get(key);
    }
    set(key, buffer) {
        this.storage.set(key, {
            buffer,
            hash: this.hash(buffer),
        });
    }
    hash(data) {
        return crypto.createHash('md5').update(data).digest('hex');
    }
}
exports.BufferCache = BufferCache;
