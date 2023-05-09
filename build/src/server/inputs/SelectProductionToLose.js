"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectProductionToLose = void 0;
const PlayerInput_1 = require("../PlayerInput");
const PlayerInputType_1 = require("../../common/input/PlayerInputType");
const Units_1 = require("../../common/Units");
const InputResponse_1 = require("../../common/inputs/InputResponse");
const utils_1 = require("../../common/utils/utils");
class SelectProductionToLose extends PlayerInput_1.BasePlayerInput {
    constructor(title, unitsToLose, player, cb, buttonLabel = 'Save') {
        super(PlayerInputType_1.PlayerInputType.SELECT_PRODUCTION_TO_LOSE, title);
        this.unitsToLose = unitsToLose;
        this.player = player;
        this.cb = cb;
        this.buttonLabel = buttonLabel;
    }
    process(input, player) {
        if (!(0, InputResponse_1.isSelectProductionToLoseResponse)(input)) {
            throw new Error('Not a valid SelectProductionToLoseResponse');
        }
        if (!Units_1.Units.isUnits(input.units)) {
            throw new Error('not a units object');
        }
        const array = Object.values(input.units);
        if (array.some((count) => count < 0)) {
            throw new Error('All units must be positive');
        }
        if (!player.production.canAdjust(Units_1.Units.negative(input.units))) {
            throw new Error('You do not have those units');
        }
        if ((0, utils_1.sum)(array) !== this.unitsToLose) {
            throw new Error(`Select ${this.unitsToLose} steps of production.`);
        }
        this.cb(input.units);
        return undefined;
    }
}
exports.SelectProductionToLose = SelectProductionToLose;
