"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectSpace = void 0;
const InputResponse_1 = require("../../common/inputs/InputResponse");
const PlayerInput_1 = require("../PlayerInput");
const InputError_1 = require("./InputError");
class SelectSpace extends PlayerInput_1.BasePlayerInput {
    constructor(title, spaces) {
        super('space', title);
        this.spaces = spaces;
        if (spaces.length === 0) {
            throw new InputError_1.InputError('No available spaces');
        }
    }
    toModel() {
        return {
            title: this.title,
            buttonLabel: this.buttonLabel,
            type: 'space',
            spaces: this.spaces.map((space) => space.id),
        };
    }
    process(input) {
        if (!(0, InputResponse_1.isSelectSpaceResponse)(input)) {
            throw new InputError_1.InputError('Not a valid SelectSpaceResponse');
        }
        const space = this.spaces.find((space) => space.id === input.spaceId);
        if (space === undefined) {
            throw new InputError_1.InputError('Space not available');
        }
        return this.cb(space);
    }
}
exports.SelectSpace = SelectSpace;
