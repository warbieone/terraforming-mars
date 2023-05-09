"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArabiaTerraBoard = void 0;
const SpaceBonus_1 = require("../../common/boards/SpaceBonus");
const SpaceName_1 = require("../SpaceName");
const SpaceType_1 = require("../../common/boards/SpaceType");
const Board_1 = require("./Board");
const BoardBuilder_1 = require("./BoardBuilder");
class ArabiaTerraBoard extends Board_1.Board {
    static newInstance(gameOptions, rng) {
        const builder = new BoardBuilder_1.BoardBuilder(gameOptions.venusNextExtension, gameOptions.pathfindersExpansion);
        const PLANT = SpaceBonus_1.SpaceBonus.PLANT;
        const STEEL = SpaceBonus_1.SpaceBonus.STEEL;
        const DRAW_CARD = SpaceBonus_1.SpaceBonus.DRAW_CARD;
        const TITANIUM = SpaceBonus_1.SpaceBonus.TITANIUM;
        const MICROBE = SpaceBonus_1.SpaceBonus.MICROBE;
        const DATA = SpaceBonus_1.SpaceBonus.DATA;
        const ENERGY_PRODUCTION = SpaceBonus_1.SpaceBonus.ENERGY_PRODUCTION;
        const SCIENCE = SpaceBonus_1.SpaceBonus.SCIENCE;
        builder.ocean().ocean(PLANT).land().land().ocean(DRAW_CARD, DRAW_CARD);
        builder.ocean(MICROBE, MICROBE, DRAW_CARD).ocean(PLANT).land(PLANT, PLANT).land().land(PLANT).land(PLANT);
        builder.land(PLANT, STEEL).ocean(PLANT).land(DATA, DATA, DRAW_CARD).land(STEEL).land(STEEL).land(STEEL, PLANT).cove(STEEL, TITANIUM);
        builder.land(PLANT, PLANT).land(PLANT).ocean(PLANT, PLANT).land().land().land().land(STEEL, STEEL).land();
        builder.land().land().ocean(STEEL).cove(ENERGY_PRODUCTION).ocean(PLANT, PLANT).land(SCIENCE, DRAW_CARD, STEEL).land().land().land();
        builder.land(PLANT).land(PLANT).ocean(STEEL, STEEL).land(PLANT).land(STEEL).land().cove(PLANT, TITANIUM).land(PLANT);
        builder.cove(PLANT, TITANIUM).ocean(PLANT, PLANT).cove(PLANT, PLANT).land(PLANT).land(STEEL).land(PLANT, TITANIUM).land(TITANIUM, TITANIUM);
        builder.ocean(PLANT, PLANT).land(PLANT).land(STEEL, DRAW_CARD).land(STEEL, STEEL).land(STEEL).land(DRAW_CARD);
        builder.land().land().land().land().land(STEEL);
        if (gameOptions.shuffleMapOption) {
            builder.shuffle(rng);
        }
        const spaces = builder.build();
        return new ArabiaTerraBoard(spaces);
    }
    getVolcanicSpaceIds() {
        return [
            SpaceName_1.SpaceName.TIKHONAROV,
            SpaceName_1.SpaceName.LADON,
            SpaceName_1.SpaceName.FLAUGERGUES,
            SpaceName_1.SpaceName.CHARYBDIS,
        ];
    }
    getSpaces(spaceType) {
        switch (spaceType) {
            case SpaceType_1.SpaceType.LAND:
            case SpaceType_1.SpaceType.OCEAN:
                return this.spaces.filter((space) => space.spaceType === spaceType || space.spaceType === SpaceType_1.SpaceType.COVE);
            default:
                return this.spaces.filter((space) => space.spaceType === spaceType);
        }
    }
    static deserialize(board, players) {
        return new ArabiaTerraBoard(Board_1.Board.deserializeSpaces(board.spaces, players));
    }
}
exports.ArabiaTerraBoard = ArabiaTerraBoard;
