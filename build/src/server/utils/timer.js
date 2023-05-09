"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeAsync = exports.timeSync = void 0;
function timeSync(cb) {
    const startMs = Date.now();
    return {
        value: cb(),
        duration: Date.now() - startMs,
    };
}
exports.timeSync = timeSync;
function timeAsync(promise) {
    const startMs = Date.now();
    return promise.then((value) => {
        return { value, duration: Date.now() - startMs };
    });
}
exports.timeAsync = timeAsync;
