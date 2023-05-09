"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmazonisBoard = void 0;
const SpaceBonus_1 = require("../../common/boards/SpaceBonus");
const Board_1 = require("./Board");
const BoardBuilder_1 = require("./BoardBuilder");
const SpaceName_1 = require("../SpaceName");
class AmazonisBoard extends Board_1.Board {
    static newInstance(gameOptions, rng) {
        const builder = new BoardBuilder_1.BoardBuilder(gameOptions.venusNextExtension, gameOptions.pathfindersExpansion);
        const PLANT = SpaceBonus_1.SpaceBonus.PLANT;
        const STEEL = SpaceBonus_1.SpaceBonus.STEEL;
        const DRAW_CARD = SpaceBonus_1.SpaceBonus.DRAW_CARD;
        const TITANIUM = SpaceBonus_1.SpaceBonus.TITANIUM;
        const MICROBE = SpaceBonus_1.SpaceBonus.MICROBE;
        const ANIMAL = SpaceBonus_1.SpaceBonus.ANIMAL;
        const HEAT = SpaceBonus_1.SpaceBonus.HEAT;
        const RESTRICTED = SpaceBonus_1.SpaceBonus.RESTRICTED;
        builder.land().ocean(PLANT).land(PLANT, PLANT, PLANT).land(MICROBE).land(ANIMAL);
        builder.ocean(TITANIUM).land(MICROBE, MICROBE).land().land().ocean(DRAW_CARD, DRAW_CARD).ocean();
        builder.land(PLANT, PLANT).land(STEEL, PLANT).land(STEEL, HEAT).land(HEAT, PLANT).land(ANIMAL).land().land(MICROBE);
        builder.land().ocean(PLANT).land().land(PLANT).land(HEAT, PLANT).land(STEEL).land(PLANT).ocean(STEEL, PLANT);
        builder.land(PLANT).land(PLANT).land().land(HEAT, HEAT).land(RESTRICTED).doNotShuffleLastSpace()
            .land(HEAT, HEAT).land(PLANT, PLANT).land().land(TITANIUM, TITANIUM);
        builder.ocean(PLANT, PLANT).land(PLANT).land(STEEL).land(HEAT, PLANT).land(PLANT).land(DRAW_CARD).land().ocean(PLANT);
        builder.ocean(PLANT).land().land(MICROBE).land(HEAT, PLANT).land().land(PLANT, PLANT).ocean(PLANT, PLANT);
        builder.land(TITANIUM).ocean(PLANT).land(STEEL).land().land(ANIMAL).land(PLANT);
        builder.land().land(DRAW_CARD).land(STEEL).ocean(PLANT).land(STEEL, STEEL);
        if (gameOptions.shuffleMapOption) {
            builder.shuffle(rng, SpaceName_1.SpaceName.MEDUSAE_FOSSAE, SpaceName_1.SpaceName.ALBOR_THOLUS, SpaceName_1.SpaceName.ANSERIS_MONS, SpaceName_1.SpaceName.PINDUS_MONS, SpaceName_1.SpaceName.ULYSSES_THOLUS);
        }
        const spaces = builder.build();
        return new AmazonisBoard(spaces);
    }
    static deserialize(board, players) {
        return new AmazonisBoard(Board_1.Board.deserializeSpaces(board.spaces, players));
    }
    getNonReservedLandSpaces() {
        return super.getNonReservedLandSpaces().filter((space) => space.bonus.includes(SpaceBonus_1.SpaceBonus.RESTRICTED) === false);
    }
    getVolcanicSpaceIds() {
        return [
            SpaceName_1.SpaceName.ALBOR_THOLUS,
            SpaceName_1.SpaceName.ANSERIS_MONS,
            SpaceName_1.SpaceName.PINDUS_MONS,
            SpaceName_1.SpaceName.ULYSSES_THOLUS,
        ];
    }
    getNoctisCitySpaceIds() {
        return [];
    }
}
exports.AmazonisBoard = AmazonisBoard;
