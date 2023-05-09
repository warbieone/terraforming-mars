"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectColony = void 0;
const PlayerInput_1 = require("../PlayerInput");
const PlayerInputType_1 = require("../../common/input/PlayerInputType");
const InputResponse_1 = require("../../common/inputs/InputResponse");
class SelectColony extends PlayerInput_1.BasePlayerInput {
    constructor(title, buttonLabel = 'Save', colonies, cb) {
        super(PlayerInputType_1.PlayerInputType.SELECT_COLONY, title);
        this.colonies = colonies;
        this.cb = cb;
        this.showTileOnly = false;
        this.buttonLabel = buttonLabel;
    }
    process(input) {
        if (!(0, InputResponse_1.isSelectColonyResponse)(input)) {
            throw new Error('Not a valid SelectColonyResponse');
        }
        if (input.colonyName === undefined) {
            throw new Error('No colony selected');
        }
        const colony = this.colonies.find((c) => c.name === input.colonyName);
        if (colony === undefined) {
            throw new Error(`Colony ${input.colonyName} not found`);
        }
        return this.cb(colony);
    }
}
exports.SelectColony = SelectColony;
