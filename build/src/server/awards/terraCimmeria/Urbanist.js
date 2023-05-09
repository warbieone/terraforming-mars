"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Urbanist = void 0;
const Board_1 = require("../../boards/Board");
const TileType_1 = require("../../../common/TileType");
class Urbanist {
    constructor() {
        this.name = 'Urbanist';
        this.description = 'Most VP from city tile adjacencies on Mars';
    }
    getScore(player) {
        let score = 0;
        player.game.board.spaces.forEach((space) => {
            var _a, _b, _c;
            if (Board_1.Board.isCitySpace(space) && ((_a = space.player) === null || _a === void 0 ? void 0 : _a.id) === player.id) {
                switch ((_b = space.tile) === null || _b === void 0 ? void 0 : _b.tileType) {
                    case TileType_1.TileType.CITY:
                    case TileType_1.TileType.OCEAN_CITY:
                        const adjacent = player.game.board.getAdjacentSpaces(space);
                        for (const adj of adjacent) {
                            if (((_c = adj.tile) === null || _c === void 0 ? void 0 : _c.tileType) === TileType_1.TileType.GREENERY)
                                score++;
                        }
                        break;
                    case TileType_1.TileType.CAPITAL:
                    case TileType_1.TileType.RED_CITY:
                        const card = player.playedCards.find((c) => { var _a; return c.name === ((_a = space === null || space === void 0 ? void 0 : space.tile) === null || _a === void 0 ? void 0 : _a.card); });
                        if (card !== undefined) {
                            score += card.getVictoryPoints(player);
                        }
                        break;
                    default:
                        throw new Error('foo');
                }
            }
        });
        return score;
    }
}
exports.Urbanist = Urbanist;
