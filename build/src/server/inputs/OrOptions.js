"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrOptions = void 0;
const InputResponse_1 = require("../../common/inputs/InputResponse");
const OptionsPlayerInput_1 = require("./OptionsPlayerInput");
const InputError_1 = require("./InputError");
class OrOptions extends OptionsPlayerInput_1.OptionsInput {
    constructor(...options) {
        super('or', 'Select one option', options);
    }
    toModel(player) {
        const initialIdx = this.options.findIndex((option) => option.eligibleForDefault !== false);
        const model = {
            title: this.title,
            buttonLabel: this.buttonLabel,
            type: 'or',
            options: this.options.map((option) => option.toModel(player)),
        };
        if (initialIdx > -1) {
            model.initialIdx = initialIdx;
        }
        return model;
    }
    process(input, player) {
        if (!(0, InputResponse_1.isOrOptionsResponse)(input)) {
            throw new InputError_1.InputError('Not a valid OrOptionsResponse');
        }
        if (this.options.length <= input.index) {
            throw new InputError_1.InputError('Invalid index');
        }
        player.runInput(input.response, this.options[input.index]);
        return this.cb(undefined);
    }
    reduce() {
        if (this.options.length === 0) {
            return undefined;
        }
        if (this.options.length === 1) {
            return this.options[0].cb();
        }
        return this;
    }
}
exports.OrOptions = OrOptions;
