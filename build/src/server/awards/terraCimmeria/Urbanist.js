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
            if (Board_1.Board.isCitySpace(space) && space.player?.id === player.id) {
                switch (space.tile?.tileType) {
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
        const cardName = space?.tile?.card;
        if (cardName === undefined) {
            return 0;
        }
        const card = player.getPlayedCard(cardName);
        if (card === undefined) {
            return 0;
        }
        return card.getVictoryPoints(player);
    }
}
exports.Urbanist = Urbanist;
