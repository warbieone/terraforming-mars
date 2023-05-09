"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectPartyToSendDelegate = void 0;
const PlayerInput_1 = require("../PlayerInput");
const PlayerInputType_1 = require("../../common/input/PlayerInputType");
const InputResponse_1 = require("../../common/inputs/InputResponse");
class SelectPartyToSendDelegate extends PlayerInput_1.BasePlayerInput {
    constructor(title, buttonLabel = 'Send delegate', availableParties, cb) {
        super(PlayerInputType_1.PlayerInputType.SELECT_PARTY_TO_SEND_DELEGATE, title);
        this.availableParties = availableParties;
        this.cb = cb;
        this.buttonLabel = buttonLabel;
    }
    process(input) {
        if (!(0, InputResponse_1.isSelectPartyResponse)(input)) {
            throw new Error('Not a valid SelectPartyResponse');
        }
        if (input.partyName === undefined) {
            throw new Error('No party selected');
        }
        if (!this.availableParties.includes(input.partyName)) {
            throw new Error('Invalid party selected');
        }
        return this.cb(input.partyName);
    }
}
exports.SelectPartyToSendDelegate = SelectPartyToSendDelegate;
