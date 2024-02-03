"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectOption = void 0;
const PlayerInput_1 = require("../PlayerInput");
const InputResponse_1 = require("../../common/inputs/InputResponse");
class SelectOption extends PlayerInput_1.BasePlayerInput {
    constructor(title, buttonLabel = 'Confirm') {
        super('option', title);
        this.warnings = undefined;
        this.buttonLabel = buttonLabel;
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
            throw new Error('Not a valid SelectOptionResponse');
        }
        return this.cb(undefined);
    }
}
exports.SelectOption = SelectOption;
//# sourceMappingURL=SelectOption.js.map