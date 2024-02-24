"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isIDescription = void 0;
function isIDescription(item) {
    return item && item.text && typeof (item.text) === 'string';
}
exports.isIDescription = isIDescription;
