"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Urbanist = void 0;
const Board_1 = require("../../boards/Board");
const TileType_1 = require("../../../common/TileType");
class Urbanist {
    constructor() {
        this.name = 'Urbanist';
        this.description = 'Have the most VP from city tile adjacencies on Mars';
    }
    getScore(player) {
        let score = 0;
        player.game.board.spaces.forEach((space) => {
            var _a, _b;
            if (Board_1.Board.isCitySpace(space) && ((_a = space.player) === null || _a === void 0 ? void 0 : _a.id) === player.id) {
                switch ((_b = space.tile) === null || _b === void 0 ? void 0 : _b.tileType) {
                    case TileType_1.TileType.CITY:
                    case TileType_1.TileType.OCEAN_CITY:
                        score += this.countGreeneries(player, space);
                        break;
                    case TileType_1.TileType.CAPITAL:
                        score += this.countGreeneries(player, space) + this.getVictoryPoints(player, space);
                        break;
                    case TileType_1.TileType.RED_CITY:
                        score += this.getVictoryPoints(player, space);
                        break;
                    default:
                        throw new Error('foo');
                }
            }
        });
        return score;
    }
    countGreeneries(player, space) {
        let score = 0;
        const adjacent = player.game.board.getAdjacentSpaces(space);
        for (const adj of adjacent) {
            if (Board_1.Board.isGreenerySpace(adj)) {
                score++;
            }
        }
        return score;
    }
    getVictoryPoints(player, space) {
        const card = player.playedCards.find((c) => { var _a; return c.name === ((_a = space === null || space === void 0 ? void 0 : space.tile) === null || _a === void 0 ? void 0 : _a.card); });
        if (card !== undefined) {
            return card.getVictoryPoints(player);
        }
        return 0;
    }
}
exports.Urbanist = Urbanist;
//# sourceMappingURL=Urbanist.js.map