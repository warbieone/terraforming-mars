"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSpectatorId = exports.isGameId = exports.isPlayerId = void 0;
function isPlayerId(object) {
    var _a;
    return ((_a = object === null || object === void 0 ? void 0 : object.charAt) === null || _a === void 0 ? void 0 : _a.call(object, 0)) === 'p';
}
exports.isPlayerId = isPlayerId;
function isGameId(object) {
    var _a;
    return ((_a = object === null || object === void 0 ? void 0 : object.charAt) === null || _a === void 0 ? void 0 : _a.call(object, 0)) === 'g';
}
exports.isGameId = isGameId;
function isSpectatorId(object) {
    var _a;
    return ((_a = object === null || object === void 0 ? void 0 : object.charAt) === null || _a === void 0 ? void 0 : _a.call(object, 0)) === 's';
}
exports.isSpectatorId = isSpectatorId;
