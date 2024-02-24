"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entrepreneur = void 0;
const Board_1 = require("../boards/Board");
class Entrepreneur {
    constructor() {
        this.name = 'Entrepreneur';
        this.description = 'Own the most tiles that grant adjacency bonuses';
    }
    getScore(player) {
        return player.game.board.spaces
            .filter(Board_1.Board.ownedBy(player))
            .filter((space) => (space.adjacency && space.adjacency.bonus.length > 0)).length;
    }
}
exports.Entrepreneur = Entrepreneur;
