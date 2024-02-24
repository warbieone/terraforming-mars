"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isIActionCard = exports.isIHasCheckLoops = void 0;
function isIHasCheckLoops(object) {
    return object.getCheckLoops !== undefined;
}
exports.isIHasCheckLoops = isIHasCheckLoops;
function isIActionCard(object) {
    return object !== undefined && object.canAct !== undefined && object.action !== undefined;
}
exports.isIActionCard = isIActionCard;
