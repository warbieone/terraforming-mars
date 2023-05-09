"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = void 0;
class Log {
    static applyData(message, cb) {
        return message.message.replace(/\$\{(\d{1,2})\}/gi, (_match, idx) => {
            return cb(message.data[idx], idx);
        });
    }
}
exports.Log = Log;
