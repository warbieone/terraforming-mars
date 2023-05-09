"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isICardRenderItem = exports.isICardRenderCorpBoxAction = exports.isICardRenderCorpBoxEffect = exports.isICardRenderEffect = exports.isICardRenderProductionBox = exports.isICardRenderTile = exports.isICardRenderSymbol = exports.isICardRenderRoot = void 0;
function isICardRenderRoot(item) {
    return typeof (item) !== 'string' && (item === null || item === void 0 ? void 0 : item.is) === 'root';
}
exports.isICardRenderRoot = isICardRenderRoot;
function isICardRenderSymbol(item) {
    return typeof (item) !== 'string' && (item === null || item === void 0 ? void 0 : item.is) === 'symbol';
}
exports.isICardRenderSymbol = isICardRenderSymbol;
function isICardRenderTile(item) {
    return typeof (item) !== 'string' && (item === null || item === void 0 ? void 0 : item.is) === 'tile';
}
exports.isICardRenderTile = isICardRenderTile;
function isICardRenderProductionBox(item) {
    return typeof (item) !== 'string' && (item === null || item === void 0 ? void 0 : item.is) === 'production-box';
}
exports.isICardRenderProductionBox = isICardRenderProductionBox;
function isICardRenderEffect(item) {
    return typeof (item) !== 'string' && (item === null || item === void 0 ? void 0 : item.is) === 'effect';
}
exports.isICardRenderEffect = isICardRenderEffect;
function isICardRenderCorpBoxEffect(item) {
    return typeof (item) !== 'string' && (item === null || item === void 0 ? void 0 : item.is) === 'corp-box-effect';
}
exports.isICardRenderCorpBoxEffect = isICardRenderCorpBoxEffect;
function isICardRenderCorpBoxAction(item) {
    return typeof (item) !== 'string' && (item === null || item === void 0 ? void 0 : item.is) === 'corp-box-action';
}
exports.isICardRenderCorpBoxAction = isICardRenderCorpBoxAction;
function isICardRenderItem(item) {
    return typeof (item) !== 'string' && (item === null || item === void 0 ? void 0 : item.is) === 'item';
}
exports.isICardRenderItem = isICardRenderItem;
