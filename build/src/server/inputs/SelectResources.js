"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectResources = void 0;
const PlayerInput_1 = require("../PlayerInput");
const InputResponse_1 = require("../../common/inputs/InputResponse");
const InputError_1 = require("./InputError");
const utils_1 = require("../../common/utils/utils");
class SelectResources extends PlayerInput_1.BasePlayerInput {
    constructor(title, count, buttonLabel = 'Select') {
        super('resources', title);
        this.title = title;
        this.count = count;
        this.buttonLabel = buttonLabel;
    }
    toModel() {
        return {
            title: this.title,
            buttonLabel: this.buttonLabel,
            type: 'resources',
            count: this.count,
        };
    }
    process(input) {
        if (!(0, InputResponse_1.isSelectResourcesResponse)(input)) {
            throw new InputError_1.InputError('Not a valid SelectResourcesResponse');
        }
        const array = Object.values(input.units);
        if (array.some((count) => count < 0)) {
            throw new InputError_1.InputError('All units must be positive');
        }
        if ((0, utils_1.sum)(array) !== this.count) {
            throw new InputError_1.InputError(`Select ${this.count} resource(s)`);
        }
        return this.cb(input.units);
    }
}
exports.SelectResources = SelectResources;
