"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogBuilder = void 0;
const LogMessageType_1 = require("../../common/logs/LogMessageType");
const LogMessage_1 = require("../../common/logs/LogMessage");
const MessageBuilder_1 = require("./MessageBuilder");
class LogBuilder extends MessageBuilder_1.MessageBuilder {
    constructor(message) {
        super(message);
        this.type = LogMessageType_1.LogMessageType.DEFAULT;
    }
    forNewGeneration() {
        this.type = LogMessageType_1.LogMessageType.NEW_GENERATION;
        return this;
    }
    build() {
        const message = this.getMessage();
        return new LogMessage_1.LogMessage(this.type, message.message, message.data);
    }
}
exports.LogBuilder = LogBuilder;
