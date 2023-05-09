"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElysiumBoard = void 0;
const SpaceBonus_1 = require("../../common/boards/SpaceBonus");
const SpaceName_1 = require("../SpaceName");
const Board_1 = require("./Board");
const BoardBuilder_1 = require("./BoardBuilder");
class ElysiumBoard extends Board_1.Board {
    static newInstance(gameOptions, rng) {
        const builder = new BoardBuilder_1.BoardBuilder(gameOptions.venusNextExtension, gameOptions.pathfindersExpansion);
        const PLANT = SpaceBonus_1.SpaceBonus.PLANT;
        const STEEL = SpaceBonus_1.SpaceBonus.STEEL;
        const DRAW_CARD = SpaceBonus_1.SpaceBonus.DRAW_CARD;
        const TITANIUM = SpaceBonus_1.SpaceBonus.TITANIUM;
        builder.ocean().ocean(TITANIUM).ocean(DRAW_CARD).ocean(STEEL).land(DRAW_CARD);
        builder.land(TITANIUM).land().land().ocean().ocean().land(STEEL, STEEL);
        builder.land(TITANIUM, TITANIUM).land().land(DRAW_CARD).land().ocean(PLANT).ocean().land(DRAW_CARD, DRAW_CARD, DRAW_CARD);
        builder.land(PLANT).land(PLANT).land(PLANT).ocean(PLANT, PLANT).land(PLANT).ocean(PLANT).ocean(PLANT).land(PLANT, STEEL);
        builder.land(PLANT, PLANT).land(PLANT, PLANT).land(PLANT, PLANT).ocean(PLANT, PLANT).land(PLANT, PLANT).land(PLANT, PLANT, PLANT).land(PLANT, PLANT).land(PLANT, PLANT).land(PLANT, TITANIUM);
        builder.land(STEEL).land(PLANT).land(PLANT).land(PLANT).land(PLANT).land(PLANT).land(PLANT).land();
        builder.land(TITANIUM).land(STEEL).land().land().land(STEEL).land().land();
        builder.land(STEEL, STEEL).land().land().land().land(STEEL, STEEL).land();
        builder.land(STEEL).land().land(DRAW_CARD).land(DRAW_CARD).land(STEEL, STEEL);
        if (gameOptions.shuffleMapOption) {
            builder.shuffle(rng, SpaceName_1.SpaceName.HECATES_THOLUS, SpaceName_1.SpaceName.ELYSIUM_MONS, SpaceName_1.SpaceName.ARSIA_MONS_ELYSIUM, SpaceName_1.SpaceName.OLYMPUS_MONS);
        }
        const spaces = builder.build();
        return new ElysiumBoard(spaces);
    }
    static deserialize(board, players) {
        return new ElysiumBoard(Board_1.Board.deserializeSpaces(board.spaces, players));
    }
    getVolcanicSpaceIds() {
        return [
            SpaceName_1.SpaceName.ARSIA_MONS_ELYSIUM,
            SpaceName_1.SpaceName.ELYSIUM_MONS,
            SpaceName_1.SpaceName.HECATES_THOLUS,
            SpaceName_1.SpaceName.OLYMPUS_MONS,
        ];
    }
}
exports.ElysiumBoard = ElysiumBoard;
