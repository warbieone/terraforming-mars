"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nextTileView = void 0;
const nextView = {
    'show': 'hide',
    'hide': 'coords',
    'coords': 'show',
};
function nextTileView(tileView) {
    return nextView[tileView];
}
exports.nextTileView = nextTileView;
