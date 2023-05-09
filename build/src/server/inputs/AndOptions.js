"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AndOptions = void 0;
const PlayerInput_1 = require("../PlayerInput");
const PlayerInputType_1 = require("../../common/input/PlayerInputType");
const InputResponse_1 = require("../../common/inputs/InputResponse");
class AndOptions extends PlayerInput_1.BasePlayerInput {
    constructor(cb, ...options) {
        super(PlayerInputType_1.PlayerInputType.AND_OPTIONS);
        this.cb = cb;
        this.options = options;
    }
    process(input, player) {
        if (!(0, InputResponse_1.isAndOptionsResponse)(input)) {
            throw new Error('Not a valid AndOptionsResponse');
        }
        if (input.responses.length !== this.options.length) {
            throw new Error('Incorrect options provided');
        }
        for (let i = 0; i < input.responses.length; i++) {
            player.runInput(input.responses[i], this.options[i]);
        }
        return this.cb();
    }
}
exports.AndOptions = AndOptions;
