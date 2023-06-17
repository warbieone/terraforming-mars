"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrOptions = void 0;
const PlayerInput_1 = require("../PlayerInput");
const InputResponse_1 = require("../../common/inputs/InputResponse");
class OrOptions extends PlayerInput_1.BasePlayerInput {
    constructor(...options) {
        super('or', 'Select one option');
        this.options = options;
    }
    cb() {
        return undefined;
    }
    process(input, player) {
        if (!(0, InputResponse_1.isOrOptionsResponse)(input)) {
            throw new Error('Not a valid OrOptionsResponse');
        }
        if (this.options.length <= input.index) {
            throw new Error('Invalid index');
        }
        player.runInput(input.response, this.options[input.index]);
        return this.cb();
    }
}
exports.OrOptions = OrOptions;
//# sourceMappingURL=OrOptions.js.map