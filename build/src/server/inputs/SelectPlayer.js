"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectPlayer = void 0;
const PlayerInput_1 = require("../PlayerInput");
const PlayerInputType_1 = require("../../common/input/PlayerInputType");
const InputResponse_1 = require("../../common/inputs/InputResponse");
class SelectPlayer extends PlayerInput_1.BasePlayerInput {
    constructor(players, title, buttonLabel = 'Save', cb) {
        super(PlayerInputType_1.PlayerInputType.SELECT_PLAYER, title);
        this.players = players;
        this.cb = cb;
        this.buttonLabel = buttonLabel;
    }
    process(input) {
        if (!(0, InputResponse_1.isSelectPlayerResponse)(input)) {
            throw new Error('Not a valid SelectPlayerResponse');
        }
        const foundPlayer = this.players.find((player) => player.color === input.player);
        if (foundPlayer === undefined) {
            throw new Error('Player not available');
        }
        return this.cb(foundPlayer);
    }
}
exports.SelectPlayer = SelectPlayer;
