"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.message = exports.MessageBuilder = void 0;
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
        return this.playerColor(value.color);
    }
    playerColor(value) {
        this.message.data.push({ type: LogMessageDataType_1.LogMessageDataType.PLAYER, value });
        return this;
    }
    card(value, attrs) {
        return this.cardName(value.name, attrs);
    }
    cardName(value, attrs) {
        const data = { type: LogMessageDataType_1.LogMessageDataType.CARD, value };
        if (attrs !== undefined) {
            data.attrs = attrs;
        }
        this.message.data.push(data);
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
    party(value) {
        return this.partyName(value.name);
    }
    partyName(value) {
        this.message.data.push({ type: LogMessageDataType_1.LogMessageDataType.PARTY, value });
        return this;
    }
    tileType(value) {
        this.message.data.push({ type: LogMessageDataType_1.LogMessageDataType.TILE_TYPE, value: value });
        return this;
    }
    spaceBonus(value) {
        this.message.data.push({ type: LogMessageDataType_1.LogMessageDataType.SPACE_BONUS, value: value });
        return this;
    }
    globalEvent(value) {
        return this.globalEventName(value.name);
    }
    globalEventName(value) {
        this.message.data.push({ type: LogMessageDataType_1.LogMessageDataType.GLOBAL_EVENT, value: value });
        return this;
    }
    getMessage() {
        return this.message;
    }
}
exports.MessageBuilder = MessageBuilder;
function message(message, f) {
    const builder = new MessageBuilder(message);
    f?.(builder);
    return builder.getMessage();
}
exports.message = message;
