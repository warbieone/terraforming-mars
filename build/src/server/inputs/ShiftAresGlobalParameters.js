"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShiftAresGlobalParameters = void 0;
const PlayerInput_1 = require("../PlayerInput");
const InputResponse_1 = require("../../common/inputs/InputResponse");
class ShiftAresGlobalParameters extends PlayerInput_1.BasePlayerInput {
    constructor() {
        super('aresGlobalParameters', 'Adjust Ares global parameters up to 1 step.');
    }
    toModel(player) {
        if (player.game.aresData === undefined) {
            throw new Error('Ares is not defined');
        }
        return {
            title: this.title,
            buttonLabel: this.buttonLabel,
            type: 'aresGlobalParameters',
            aresData: player.game.aresData,
        };
    }
    process(input, _player) {
        if (!(0, InputResponse_1.isShiftAresGlobalParametersResponse)(input)) {
            throw new Error('Not a valid ShiftAresGlobalParametersResponse');
        }
        if (!(0, InputResponse_1.isAresGlobalParametersResponse)(input.response)) {
            throw new Error('Not a valid ShiftAresGlobalParametersResponse');
        }
        if (!this.inRange(input.response.lowOceanDelta) ||
            !this.inRange(input.response.highOceanDelta) ||
            !this.inRange(input.response.temperatureDelta) ||
            !this.inRange(input.response.oxygenDelta)) {
            throw new Error('values out of range');
        }
        this.cb(input.response);
        return undefined;
    }
    inRange(val) {
        return (val >= -1 && val <= 1);
    }
}
exports.ShiftAresGlobalParameters = ShiftAresGlobalParameters;
