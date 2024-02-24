"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tourist = void 0;
const RedTourismWave_1 = require("../../cards/turmoil/RedTourismWave");
class Tourist {
    constructor() {
        this.name = 'Tourist';
        this.description = 'Have the most empty spaces adjacent to your tiles';
    }
    getScore(player) {
        return RedTourismWave_1.RedTourismWave.getAdjacentEmptySpacesCount(player);
    }
}
exports.Tourist = Tourist;
