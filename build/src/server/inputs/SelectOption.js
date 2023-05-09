"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectOption = void 0;
const PlayerInput_1 = require("../PlayerInput");
const PlayerInputType_1 = require("../../common/input/PlayerInputType");
const InputResponse_1 = require("../../common/inputs/InputResponse");
class SelectOption extends PlayerInput_1.BasePlayerInput {
    constructor(title, buttonLabel = 'Select', cb) {
        super(PlayerInputType_1.PlayerInputType.SELECT_OPTION, title);
        this.cb = cb;
        this.buttonLabel = buttonLabel;
    }
    process(response) {
        if (!(0, InputResponse_1.isSelectOptionResponse)(response)) {
            throw new Error('Not a valid SelectOptionResponse');
        }
        return this.cb();
    }
}
exports.SelectOption = SelectOption;
