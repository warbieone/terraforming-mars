"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newMessage = exports.MessageBuilder = void 0;
const LogMessageDataType_1 = require("../../common/logs/LogMessageDataType");
class MessageBuilder {
    constructor(message) {
        this.message = {
            data: [],
            message: message,
        };
    }
    string(value) {
        this.message.data.push({ type: LogMessageDataType_1.LogMessageDataType.STRING, value });
        return this;
    }
    rawString(value) {
        this.message.data.push({ type: LogMessageDataType_1.LogMessageDataType.RAW_STRING, value });
        return this;
    }
    number(value) {
        this.message.data.push({ type: LogMessageDataType_1.LogMessageDataType.RAW_STRING, value: value.toString() });
        return this;
    }
    player(value) {
        return this.playerId(value.color);
    }
    playerId(value) {
        this.message.data.push({ type: LogMessageDataType_1.LogMessageDataType.PLAYER, value });
        return this;
    }
    card(value) {
        return this.cardName(value.name);
    }
    cardName(value) {
        this.message.data.push({ type: LogMessageDataType_1.LogMessageDataType.CARD, value });
        return this;
    }
    award(value) {
        this.message.data.push({ type: LogMessageDataType_1.LogMessageDataType.AWARD, value: value.name });
        return this;
    }
    milestone(value) {
        this.message.data.push({ type: LogMessageDataType_1.LogMessageDataType.MILESTONE, value: value.name });
        return this;
    }
    colony(value) {
        this.message.data.push({ type: LogMessageDataType_1.LogMessageDataType.COLONY, value: value.name });
        return this;
    }
    standardProject(value) {
        this.message.data.push({ type: LogMessageDataType_1.LogMessageDataType.STANDARD_PROJECT, value });
        return this;
    }
    party(value) {
        this.message.data.push({ type: LogMessageDataType_1.LogMessageDataType.PARTY, value: value.name });
        return this;
    }
    partyName(value) {
        this.message.data.push({ type: LogMessageDataType_1.LogMessageDataType.PARTY, value });
        return this;
    }
    tileType(value) {
        this.message.data.push({ type: LogMessageDataType_1.LogMessageDataType.TILE_TYPE, value: value.toString() });
        return this;
    }
    spaceBonus(value) {
        this.message.data.push({ type: LogMessageDataType_1.LogMessageDataType.SPACE_BONUS, value: value.toString() });
        return this;
    }
    globalEvent(value) {
        return this.globalEventName(value.name);
    }
    globalEventName(value) {
        this.message.data.push({ type: LogMessageDataType_1.LogMessageDataType.GLOBAL_EVENT, value: value.toString() });
        return this;
    }
    getMessage() {
        return this.message;
    }
}
exports.MessageBuilder = MessageBuilder;
function newMessage(message, f) {
    const builder = new MessageBuilder(message);
    f === null || f === void 0 ? void 0 : f(builder);
    return builder.getMessage();
}
exports.newMessage = newMessage;
