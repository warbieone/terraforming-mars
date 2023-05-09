"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameLogs = void 0;
const LogMessageType_1 = require("../../common/logs/LogMessageType");
const Phase_1 = require("../../common/Phase");
const Log_1 = require("../../common/logs/Log");
const LogMessageDataType_1 = require("../../common/logs/LogMessageDataType");
class GameLogs {
    getLogsForGeneration(messages, generation) {
        var _a;
        let foundStart = generation === 1;
        const newMessages = [];
        for (const message of messages) {
            if (message.type === LogMessageType_1.LogMessageType.NEW_GENERATION) {
                const value = Number((_a = message.data[0]) === null || _a === void 0 ? void 0 : _a.value);
                if (value === generation) {
                    foundStart = true;
                }
                else if (value === generation + 1) {
                    break;
                }
            }
            if (foundStart === true) {
                newMessages.push(message);
            }
        }
        return newMessages;
    }
    getLogsForGameView(playerId, game, generation) {
        const messagesForPlayer = ((message) => message.playerId === undefined || message.playerId === playerId);
        if (generation === null || Number(generation) === game.generation) {
            return game.gameLog.filter(messagesForPlayer).slice(-50);
        }
        else {
            return this.getLogsForGeneration(game.gameLog, Number(generation)).filter(messagesForPlayer);
        }
    }
    getLogsForGameEnd(game) {
        if (game.phase !== Phase_1.Phase.END) {
            throw new Error('Game is not over');
        }
        return game.gameLog.map((message) => Log_1.Log.applyData(message, (datum) => {
            if (datum.type === undefined || datum.value === undefined) {
                return '';
            }
            switch (datum.type) {
                case LogMessageDataType_1.LogMessageDataType.PLAYER:
                    for (const player of game.getPlayers()) {
                        if (datum.value === player.color) {
                            return player.name;
                        }
                    }
                    return datum.value;
                case LogMessageDataType_1.LogMessageDataType.CARD:
                case LogMessageDataType_1.LogMessageDataType.GLOBAL_EVENT:
                case LogMessageDataType_1.LogMessageDataType.TILE_TYPE:
                case LogMessageDataType_1.LogMessageDataType.COLONY:
                default:
                    return datum.value;
            }
        }));
    }
}
exports.GameLogs = GameLogs;
