"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inplaceShuffle = void 0;
function inplaceShuffle(array, rng) {
    let last = array.length;
    while (last > 0) {
        const idx = rng.nextInt(last);
        last--;
        [array[last], array[idx]] = [array[idx], array[last]];
    }
}
exports.inplaceShuffle = inplaceShuffle;
