"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMarsSpace = exports.isMoonSpace = void 0;
function isMoonSpace(spaceId) {
    return spaceId.startsWith('m');
}
exports.isMoonSpace = isMoonSpace;
function isMarsSpace(spaceId) {
    return !isMoonSpace(spaceId);
}
exports.isMarsSpace = isMarsSpace;
