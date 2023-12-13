"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrOptions = void 0;
const InputResponse_1 = require("../../common/inputs/InputResponse");
const OptionsPlayerInput_1 = require("./OptionsPlayerInput");
class OrOptions extends OptionsPlayerInput_1.OptionsInput {
    constructor(...options) {
        super('or', 'Select one option', options);
    }
    toModel(player) {
        return {
            title: this.title,
            buttonLabel: this.buttonLabel,
            type: 'or',
            options: this.options.map((option) => option.toModel(player)),
        };
    }
    process(input, player) {
        if (!(0, InputResponse_1.isOrOptionsResponse)(input)) {
            throw new Error('Not a valid OrOptionsResponse');
        }
        if (this.options.length <= input.index) {
            throw new Error('Invalid index');
        }
        player.runInput(input.response, this.options[input.index]);
        return this.cb(undefined);
    }
}
exports.OrOptions = OrOptions;
//# sourceMappingURL=OrOptions.js.map