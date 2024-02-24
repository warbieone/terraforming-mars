"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isICloneTagCard = void 0;
function isICloneTagCard(obj) {
    return 'cloneTag' in obj;
}
exports.isICloneTagCard = isICloneTagCard;
