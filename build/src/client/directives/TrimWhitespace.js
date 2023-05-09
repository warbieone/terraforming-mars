"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trimEmptyTextNodes = void 0;
function trimEmptyTextNodes(el) {
    for (let i = 0; i < el.childNodes.length; i++) {
        const node = el.childNodes[i];
        if (node.nodeType === Node.TEXT_NODE && node.data.trim() === '') {
            node.remove();
            i--;
        }
    }
}
exports.trimEmptyTextNodes = trimEmptyTextNodes;
