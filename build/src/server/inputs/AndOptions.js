"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AndOptions = void 0;
const InputResponse_1 = require("../../common/inputs/InputResponse");
const OptionsPlayerInput_1 = require("./OptionsPlayerInput");
class AndOptions extends OptionsPlayerInput_1.OptionsInput {
    constructor(...options) {
        super('and', '', options);
    }
    toModel(player) {
        return {
            title: this.title,
            buttonLabel: this.buttonLabel,
            type: 'and',
            options: this.options.map((option) => option.toModel(player)),
        };
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
        return this.cb(undefined);
    }
}
exports.AndOptions = AndOptions;
