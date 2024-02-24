"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogMessage = void 0;
const LogMessageType_1 = require("./LogMessageType");
class LogMessage {
    constructor(type, message, data, playerId) {
        this.message = message;
        this.data = data;
        this.timestamp = Date.now();
        if (playerId !== undefined) {
            this.playerId = playerId;
        }
        if (type !== LogMessageType_1.LogMessageType.DEFAULT) {
            this.type = type;
        }
    }
}
exports.LogMessage = LogMessage;
