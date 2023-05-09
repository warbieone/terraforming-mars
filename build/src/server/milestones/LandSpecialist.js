"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LandSpecialist = void 0;
const IMilestone_1 = require("./IMilestone");
const Board_1 = require("../boards/Board");
const MoonExpansion_1 = require("../moon/MoonExpansion");
class LandSpecialist extends IMilestone_1.BaseMilestone {
    constructor() {
        super('Land Specialist', 'Have 3 special (normally, brown) tiles', 3);
    }
    getScore(player) {
        const spaces = player.game.board.spaces
            .filter((0, Board_1.playerTileFn)(player))
            .filter(Board_1.isSpecialTile);
        const marsCount = spaces.length;
        const moonCount = MoonExpansion_1.MoonExpansion.ifElseMoon(player.game, (moonData) => {
            return moonData.moon.spaces
                .filter((0, Board_1.playerTileFn)(player))
                .filter(Board_1.isSpecialTile)
                .length;
        }, () => 0);
        return marsCount + moonCount;
    }
}
exports.LandSpecialist = LandSpecialist;
