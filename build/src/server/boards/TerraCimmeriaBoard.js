"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TerraCimmeriaBoard = void 0;
const SpaceBonus_1 = require("../../common/boards/SpaceBonus");
const Board_1 = require("./Board");
const BoardBuilder_1 = require("./BoardBuilder");
const SpaceName_1 = require("../SpaceName");
class TerraCimmeriaBoard extends Board_1.Board {
    static newInstance(gameOptions, rng) {
        const builder = new BoardBuilder_1.BoardBuilder(gameOptions.venusNextExtension, gameOptions.pathfindersExpansion);
        const PLANT = SpaceBonus_1.SpaceBonus.PLANT;
        const STEEL = SpaceBonus_1.SpaceBonus.STEEL;
        const DRAW_CARD = SpaceBonus_1.SpaceBonus.DRAW_CARD;
        const TITANIUM = SpaceBonus_1.SpaceBonus.TITANIUM;
        const ENERGY = SpaceBonus_1.SpaceBonus.ENERGY;
        builder.ocean().land(PLANT).land(STEEL).land(PLANT, PLANT).ocean(PLANT, PLANT);
        builder.ocean(TITANIUM, TITANIUM).land().land().land(PLANT).land(PLANT, STEEL).ocean(PLANT);
        builder.land().land(PLANT).land(ENERGY, ENERGY, ENERGY).land().land(PLANT).land(PLANT).land(PLANT);
        builder.land(STEEL, STEEL).land(PLANT, PLANT).land().land(ENERGY, ENERGY).land().land().land(DRAW_CARD).land();
        builder.land().land(PLANT, ENERGY).land(ENERGY, ENERGY).land(STEEL).land(STEEL)
            .land(DRAW_CARD).land().land(STEEL).ocean(DRAW_CARD);
        builder.land(DRAW_CARD, DRAW_CARD).land().land(TITANIUM).land().land().land(STEEL, STEEL).land().land(STEEL, STEEL);
        builder.land().land(TITANIUM).land(PLANT).land(PLANT, STEEL, STEEL).land(PLANT, PLANT).land(PLANT).ocean(PLANT, PLANT);
        builder.ocean(STEEL, STEEL).land(PLANT).land(TITANIUM).land(DRAW_CARD).land(PLANT).ocean(PLANT);
        builder.ocean(PLANT, PLANT).ocean(PLANT, PLANT).ocean(PLANT, PLANT).land(PLANT).ocean(PLANT, PLANT);
        if (gameOptions.shuffleMapOption) {
            builder.shuffle(rng);
        }
        const spaces = builder.build();
        return new TerraCimmeriaBoard(spaces);
    }
    static deserialize(board, players) {
        return new TerraCimmeriaBoard(Board_1.Board.deserializeSpaces(board.spaces, players));
    }
    getNonReservedLandSpaces() {
        return super.getNonReservedLandSpaces();
    }
    getVolcanicSpaceIds() {
        return [
            SpaceName_1.SpaceName.ALBOR_THOLUS_TERRACIMMERIA,
            SpaceName_1.SpaceName.APOLLINARIS_MONS,
            SpaceName_1.SpaceName.HADRIACUS_MONS,
            SpaceName_1.SpaceName.TYRRHENUS_MONS,
        ];
    }
    getNoctisCitySpaceIds() {
        return [];
    }
}
exports.TerraCimmeriaBoard = TerraCimmeriaBoard;
//# sourceMappingURL=TerraCimmeriaBoard.js.map