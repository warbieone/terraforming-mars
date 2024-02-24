"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameSetup = void 0;
const BoardName_1 = require("../common/boards/BoardName");
const ElysiumBoard_1 = require("./boards/ElysiumBoard");
const HellasBoard_1 = require("./boards/HellasBoard");
const TharsisBoard_1 = require("./boards/TharsisBoard");
const Player_1 = require("./Player");
const Color_1 = require("../common/Color");
const TileType_1 = require("../common/TileType");
const ArabiaTerraBoard_1 = require("./boards/ArabiaTerraBoard");
const VastitasBorealisBoard_1 = require("./boards/VastitasBorealisBoard");
const TerraCimmeriaBoard_1 = require("./boards/TerraCimmeriaBoard");
const AmazonisBoard_1 = require("./boards/AmazonisBoard");
const UnderworldExpansion_1 = require("./underworld/UnderworldExpansion");
const boards = {
    [BoardName_1.BoardName.THARSIS]: TharsisBoard_1.TharsisBoard,
    [BoardName_1.BoardName.HELLAS]: HellasBoard_1.HellasBoard,
    [BoardName_1.BoardName.ELYSIUM]: ElysiumBoard_1.ElysiumBoard,
    [BoardName_1.BoardName.AMAZONIS]: AmazonisBoard_1.AmazonisBoard,
    [BoardName_1.BoardName.ARABIA_TERRA]: ArabiaTerraBoard_1.ArabiaTerraBoard,
    [BoardName_1.BoardName.TERRA_CIMMERIA]: TerraCimmeriaBoard_1.TerraCimmeriaBoard,
    [BoardName_1.BoardName.VASTITAS_BOREALIS]: VastitasBorealisBoard_1.VastitasBorealisBoard,
};
class GameSetup {
    static newBoard(gameOptions, rng) {
        const factory = boards[gameOptions.boardName];
        return factory.newInstance(gameOptions, rng);
    }
    static deserializeBoard(players, gameOptions, d) {
        const playersForBoard = players.length !== 1 ? players : [players[0], GameSetup.neutralPlayerFor(d.id)];
        const factory = boards[gameOptions.boardName];
        return factory.deserialize(d.board, playersForBoard);
    }
    static neutralPlayerFor(gameId) {
        const playerId = 'p-' + gameId + '-neutral';
        return new Player_1.Player('neutral', Color_1.Color.NEUTRAL, true, 0, playerId);
    }
    static setupNeutralPlayer(game) {
        const neutral = this.neutralPlayerFor(game.id);
        function placeCityAndForest(game, direction) {
            const board = game.board;
            const citySpace = game.getSpaceByOffset(direction, TileType_1.TileType.CITY);
            game.simpleAddTile(neutral, citySpace, { tileType: TileType_1.TileType.CITY });
            if (game.gameOptions.underworldExpansion === true) {
                UnderworldExpansion_1.UnderworldExpansion.identify(game, citySpace, undefined);
            }
            const adjacentSpaces = board.getAdjacentSpaces(citySpace).filter((s) => game.board.canPlaceTile(s));
            if (adjacentSpaces.length === 0) {
                throw new Error('No space for forest');
            }
            let idx = game.discardForCost(1, TileType_1.TileType.GREENERY);
            idx = Math.max(idx - 1, 0);
            const greenerySpace = adjacentSpaces[idx % adjacentSpaces.length];
            game.simpleAddTile(neutral, greenerySpace, { tileType: TileType_1.TileType.GREENERY });
            if (game.gameOptions.underworldExpansion === true) {
                UnderworldExpansion_1.UnderworldExpansion.identify(game, greenerySpace, undefined);
            }
        }
        placeCityAndForest(game, 1);
        placeCityAndForest(game, -1);
    }
}
exports.GameSetup = GameSetup;
