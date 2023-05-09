"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectDelegate = void 0;
const PlayerInput_1 = require("../PlayerInput");
const Player_1 = require("../Player");
const PlayerInputType_1 = require("../../common/input/PlayerInputType");
const InputResponse_1 = require("../../common/inputs/InputResponse");
class SelectDelegate extends PlayerInput_1.BasePlayerInput {
    constructor(players, title, cb) {
        super(PlayerInputType_1.PlayerInputType.SELECT_DELEGATE, title);
        this.players = players;
        this.cb = cb;
    }
    process(input) {
        if (!(0, InputResponse_1.isSelectDelegateResponse)(input)) {
            throw new Error('Not a valid SelectDelegateResponse');
        }
        const foundPlayer = this.players.find((player) => player === input.player ||
            (player instanceof Player_1.Player && (player.id === input.player || player.color === input.player)));
        if (foundPlayer === undefined) {
            throw new Error('Player not available');
        }
        return this.cb(foundPlayer);
    }
}
exports.SelectDelegate = SelectDelegate;
