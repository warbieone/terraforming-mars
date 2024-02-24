"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VastitasBorealisBoard = void 0;
const SpaceBonus_1 = require("../../common/boards/SpaceBonus");
const SpaceName_1 = require("../SpaceName");
const Board_1 = require("./Board");
const BoardBuilder_1 = require("./BoardBuilder");
const constants_1 = require("../../common/constants");
const MarsBoard_1 = require("./MarsBoard");
class VastitasBorealisBoard extends MarsBoard_1.MarsBoard {
    static newInstance(gameOptions, rng) {
        const builder = new BoardBuilder_1.BoardBuilder(gameOptions.venusNextExtension, gameOptions.pathfindersExpansion);
        const PLANT = SpaceBonus_1.SpaceBonus.PLANT;
        const STEEL = SpaceBonus_1.SpaceBonus.STEEL;
        const DRAW_CARD = SpaceBonus_1.SpaceBonus.DRAW_CARD;
        const HEAT = SpaceBonus_1.SpaceBonus.HEAT;
        const TITANIUM = SpaceBonus_1.SpaceBonus.TITANIUM;
        const TEMPERATURE = SpaceBonus_1.SpaceBonus.TEMPERATURE;
        builder.land(STEEL, STEEL).land(PLANT).land().land().land(TITANIUM, TITANIUM);
        builder.land(STEEL, STEEL).land(STEEL).land().land().land(TITANIUM).land(PLANT);
        builder.land(TITANIUM).land().land().land().land(DRAW_CARD).ocean(PLANT, DRAW_CARD).ocean(PLANT);
        builder.land(STEEL, TITANIUM).land(STEEL, DRAW_CARD).land(STEEL).ocean(HEAT, HEAT).ocean(HEAT, HEAT).ocean().ocean(PLANT, PLANT).land(STEEL, PLANT);
        builder.land().land().land().ocean(HEAT, HEAT).land(TEMPERATURE).doNotShuffleLastSpace().land(STEEL).land().land(PLANT).ocean(TITANIUM);
        builder.land(PLANT).land().land(PLANT).ocean(HEAT, HEAT).land(HEAT, HEAT).land().land(PLANT).land(TITANIUM, PLANT);
        builder.land(PLANT, PLANT).land().ocean().land().land(STEEL, PLANT).land(PLANT).land(PLANT, PLANT);
        builder.ocean(PLANT).land().land(DRAW_CARD).land(STEEL).land().land(PLANT, PLANT);
        builder.ocean(PLANT, PLANT).land().land(PLANT).land(PLANT, PLANT).land(STEEL, PLANT);
        if (gameOptions.shuffleMapOption) {
            builder.shuffle(rng);
        }
        const spaces = builder.build();
        return new VastitasBorealisBoard(spaces);
    }
    static deserialize(board, players) {
        return new VastitasBorealisBoard(Board_1.Board.deserializeSpaces(board.spaces, players));
    }
    spaceCosts(space) {
        const costs = super.spaceCosts(space);
        if (space.id === SpaceName_1.SpaceName.VASTITAS_BOREALIS_NORTH_POLE) {
            costs.stock.megacredits = constants_1.VASTITAS_BOREALIS_BONUS_TEMPERATURE_COST;
            costs.tr.oceans = 1;
        }
        return costs;
    }
    getVolcanicSpaceIds() {
        return [
            SpaceName_1.SpaceName.ELYSIUM_MONS_VASTITAS_BOREALIS,
            SpaceName_1.SpaceName.ALBA_FOSSAE,
            SpaceName_1.SpaceName.CERANIUS_FOSSAE,
            SpaceName_1.SpaceName.ALBA_MONS,
        ];
    }
}
exports.VastitasBorealisBoard = VastitasBorealisBoard;
