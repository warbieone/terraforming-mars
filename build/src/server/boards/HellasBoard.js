"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HellasBoard = void 0;
const SpaceBonus_1 = require("../../common/boards/SpaceBonus");
const SpaceName_1 = require("../SpaceName");
const constants_1 = require("../../common/constants");
const BoardBuilder_1 = require("./BoardBuilder");
const MarsBoard_1 = require("./MarsBoard");
class HellasBoard extends MarsBoard_1.MarsBoard {
    static newInstance(gameOptions, rng) {
        const builder = new BoardBuilder_1.BoardBuilder(gameOptions.venusNextExtension, gameOptions.pathfindersExpansion);
        const PLANT = SpaceBonus_1.SpaceBonus.PLANT;
        const STEEL = SpaceBonus_1.SpaceBonus.STEEL;
        const DRAW_CARD = SpaceBonus_1.SpaceBonus.DRAW_CARD;
        const HEAT = SpaceBonus_1.SpaceBonus.HEAT;
        const TITANIUM = SpaceBonus_1.SpaceBonus.TITANIUM;
        builder.ocean(PLANT, PLANT).land(PLANT, PLANT).land(PLANT, PLANT).land(PLANT, STEEL).land(PLANT);
        builder.ocean(PLANT, PLANT).land(PLANT, PLANT).land(PLANT).land(PLANT, STEEL).land(PLANT).land(PLANT);
        builder.ocean(PLANT).land(PLANT).land(STEEL).land(STEEL).land().land(PLANT, PLANT).land(PLANT, DRAW_CARD);
        builder.ocean(PLANT).land(PLANT).land(STEEL).land(STEEL, STEEL).land(STEEL).ocean(PLANT).ocean(PLANT).land(PLANT);
        builder.land(DRAW_CARD).land().land().land(STEEL, STEEL).land().ocean(DRAW_CARD).ocean(HEAT, HEAT, HEAT).ocean().land(PLANT);
        builder.land(TITANIUM).land().land(STEEL).land().land().ocean().ocean(STEEL).land();
        builder.ocean(TITANIUM, TITANIUM).land().land().land(DRAW_CARD).land().land().land(TITANIUM);
        builder.land(STEEL).land(DRAW_CARD).land(HEAT, HEAT).land(HEAT, HEAT).land(TITANIUM).land(TITANIUM);
        builder.land().land(HEAT, HEAT).land(SpaceBonus_1.SpaceBonus.OCEAN).doNotShuffleLastSpace().land(HEAT, HEAT).land();
        if (gameOptions.shuffleMapOption) {
            builder.shuffle(rng);
        }
        const spaces = builder.build();
        return new HellasBoard(spaces);
    }
    constructor(spaces) {
        super(spaces, undefined, []);
    }
    spaceCosts(space) {
        const costs = super.spaceCosts(space);
        if (space.id === SpaceName_1.SpaceName.HELLAS_OCEAN_TILE) {
            costs.stock.megacredits = constants_1.HELLAS_BONUS_OCEAN_COST;
            costs.tr.oceans = 1;
        }
        return costs;
    }
}
exports.HellasBoard = HellasBoard;
