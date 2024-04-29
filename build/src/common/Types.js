"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeCast = exports.isSpaceId = exports.isSpectatorId = exports.isGameId = exports.isPlayerId = void 0;
function isPlayerId(object) {
    return object?.charAt?.(0) === 'p';
}
exports.isPlayerId = isPlayerId;
function isGameId(object) {
    return object?.charAt?.(0) === 'g';
}
exports.isGameId = isGameId;
function isSpectatorId(object) {
    return object?.charAt?.(0) === 's';
}
exports.isSpectatorId = isSpectatorId;
function isSpaceId(object) {
    return /^m?[0-9][0-9]$/.test(object);
}
exports.isSpaceId = isSpaceId;
function safeCast(object, tester) {
    if (tester(object)) {
        return object;
    }
    throw new Error('failed cast: ' + tester.name);
}
exports.safeCast = safeCast;
