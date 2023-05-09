"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statsId = exports.serverId = exports.generateRandomId = void 0;
function generateRandomId(prefix) {
    return prefix + Math.floor(Math.random() * Math.pow(16, 12)).toString(16);
}
exports.generateRandomId = generateRandomId;
exports.serverId = process.env.SERVER_ID || generateRandomId('');
exports.statsId = process.env.STATS_ID || generateRandomId('');
