"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectAmount = void 0;
const PlayerInput_1 = require("../PlayerInput");
const PlayerInputType_1 = require("../../common/input/PlayerInputType");
const InputResponse_1 = require("../../common/inputs/InputResponse");
class SelectAmount extends PlayerInput_1.BasePlayerInput {
    constructor(title, buttonLabel = 'Save', cb, min, max, maxByDefault) {
        super(PlayerInputType_1.PlayerInputType.SELECT_AMOUNT, title);
        this.cb = cb;
        this.min = min;
        this.max = max;
        this.maxByDefault = maxByDefault;
        this.buttonLabel = buttonLabel;
    }
    process(input) {
        if (!(0, InputResponse_1.isSelectAmountResponse)(input)) {
            throw new Error('Not a valid SelectAmountResponse');
        }
        if (isNaN(input.amount)) {
            throw new Error('Amount is not a number');
        }
        if (input.amount > this.max) {
            throw new Error('Amount provided too high (max ' + String(this.max) + ')');
        }
        if (input.amount < this.min) {
            throw new Error('Amount provided too low (min ' + String(this.min) + ')');
        }
        return this.cb(input.amount);
    }
}
exports.SelectAmount = SelectAmount;
