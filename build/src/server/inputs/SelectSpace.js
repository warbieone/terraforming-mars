"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectSpace = void 0;
const PlayerInput_1 = require("../PlayerInput");
const PlayerInputType_1 = require("../../common/input/PlayerInputType");
const InputResponse_1 = require("../../common/inputs/InputResponse");
class SelectSpace extends PlayerInput_1.BasePlayerInput {
    constructor(title, availableSpaces, cb) {
        super(PlayerInputType_1.PlayerInputType.SELECT_SPACE, title);
        this.availableSpaces = availableSpaces;
        this.cb = cb;
        if (availableSpaces.length === 0) {
            throw new Error('No available spaces');
        }
    }
    process(input) {
        if (!(0, InputResponse_1.isSelectSpaceResponse)(input)) {
            throw new Error('Not a valid SelectSpaceResponse');
        }
        const space = this.availableSpaces.find((space) => space.id === input.spaceId);
        if (space === undefined) {
            throw new Error('Space not available');
        }
        return this.cb(space);
    }
}
exports.SelectSpace = SelectSpace;
