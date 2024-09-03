"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectAmount = void 0;
const PlayerInput_1 = require("../PlayerInput");
const InputResponse_1 = require("../../common/inputs/InputResponse");
const InputError_1 = require("./InputError");
class SelectAmount extends PlayerInput_1.BasePlayerInput {
    constructor(title, buttonLabel = 'Save', min, max, maxByDefault) {
        super('amount', title);
        this.min = min;
        this.max = max;
        this.maxByDefault = maxByDefault;
        this.selected = -1;
        this.buttonLabel = buttonLabel;
    }
    toModel() {
        return {
            title: this.title,
            buttonLabel: this.buttonLabel,
            type: 'amount',
            max: this.max,
            min: this.min,
            maxByDefault: this.maxByDefault ?? false,
        };
    }
    process(input) {
        if (!(0, InputResponse_1.isSelectAmountResponse)(input)) {
            throw new InputError_1.InputError('Not a valid SelectAmountResponse');
        }
        if (isNaN(input.amount)) {
            throw new InputError_1.InputError('Amount is not a number');
        }
        if (input.amount > this.max) {
            throw new InputError_1.InputError('Amount provided too high (max ' + String(this.max) + ')');
        }
        if (input.amount < this.min) {
            throw new InputError_1.InputError('Amount provided too low (min ' + String(this.min) + ')');
        }
        this.selected = input.amount;
        return this.cb(input.amount);
    }
}
exports.SelectAmount = SelectAmount;
