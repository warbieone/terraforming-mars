"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TharsisBoard = void 0;
const SpaceBonus_1 = require("../../common/boards/SpaceBonus");
const SpaceName_1 = require("../SpaceName");
const BoardBuilder_1 = require("./BoardBuilder");
const MarsBoard_1 = require("./MarsBoard");
class TharsisBoard extends MarsBoard_1.MarsBoard {
    static newInstance(gameOptions, rng) {
        const builder = new BoardBuilder_1.BoardBuilder(gameOptions.venusNextExtension, gameOptions.pathfindersExpansion);
        const PLANT = SpaceBonus_1.SpaceBonus.PLANT;
        const STEEL = SpaceBonus_1.SpaceBonus.STEEL;
        const DRAW_CARD = SpaceBonus_1.SpaceBonus.DRAW_CARD;
        const TITANIUM = SpaceBonus_1.SpaceBonus.TITANIUM;
        builder.land(STEEL, STEEL).ocean(STEEL, STEEL).land().ocean(DRAW_CARD).ocean();
        builder.land().land(STEEL).land().land().land().ocean(DRAW_CARD, DRAW_CARD);
        builder.land(DRAW_CARD).land().land().land().land().land().land(STEEL);
        builder.land(PLANT, TITANIUM).land(PLANT).land(PLANT).land(PLANT).land(PLANT, PLANT).land(PLANT).land(PLANT).ocean(PLANT, PLANT);
        builder.land(PLANT, PLANT).land(PLANT, PLANT).land(PLANT, PLANT).ocean(PLANT, PLANT).ocean(PLANT, PLANT)
            .ocean(PLANT, PLANT).land(PLANT, PLANT).land(PLANT, PLANT).land(PLANT, PLANT);
        builder.land(PLANT).land(PLANT, PLANT).land(PLANT).land(PLANT).land(PLANT).ocean(PLANT).ocean(PLANT).ocean(PLANT);
        builder.land().land().land().land().land().land(PLANT).land();
        builder.land(STEEL, STEEL).land().land(DRAW_CARD).land(DRAW_CARD).land().land(TITANIUM);
        builder.land(STEEL).land(STEEL, STEEL).land().land().ocean(TITANIUM, TITANIUM);
        if (gameOptions.shuffleMapOption) {
            builder.shuffle(rng, SpaceName_1.SpaceName.NOCTIS_CITY, SpaceName_1.SpaceName.THARSIS_THOLUS, SpaceName_1.SpaceName.ASCRAEUS_MONS, SpaceName_1.SpaceName.ARSIA_MONS, SpaceName_1.SpaceName.PAVONIS_MONS);
        }
        const spaces = builder.build();
        return new TharsisBoard(spaces);
    }
    constructor(spaces) {
        super(spaces, SpaceName_1.SpaceName.NOCTIS_CITY, [
            SpaceName_1.SpaceName.ASCRAEUS_MONS,
            SpaceName_1.SpaceName.ARSIA_MONS,
            SpaceName_1.SpaceName.PAVONIS_MONS,
            SpaceName_1.SpaceName.THARSIS_THOLUS,
        ]);
    }
}
exports.TharsisBoard = TharsisBoard;
