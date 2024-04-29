"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectOption = void 0;
const PlayerInput_1 = require("../PlayerInput");
const InputResponse_1 = require("../../common/inputs/InputResponse");
const InputError_1 = require("./InputError");
class SelectOption extends PlayerInput_1.BasePlayerInput {
    constructor(title, options = 'Confirm') {
        super('option', title);
        this.warnings = undefined;
        if (typeof options === 'string') {
            this.buttonLabel = options;
        }
        else {
            this.buttonLabel = options.buttonLabel ?? 'Confirm';
            this.warnings = options.warnings;
        }
    }
    toModel() {
        return {
            title: this.title,
            buttonLabel: this.buttonLabel,
            type: 'option',
            warnings: this.warnings,
        };
    }
    process(response) {
        if (!(0, InputResponse_1.isSelectOptionResponse)(response)) {
            throw new InputError_1.InputError('Not a valid SelectOptionResponse');
        }
        return this.cb(undefined);
    }
}
exports.SelectOption = SelectOption;
