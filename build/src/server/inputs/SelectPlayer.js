"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectPlayer = void 0;
const PlayerInput_1 = require("../PlayerInput");
const InputResponse_1 = require("../../common/inputs/InputResponse");
const InputError_1 = require("./InputError");
class SelectPlayer extends PlayerInput_1.BasePlayerInput {
    constructor(players, title, buttonLabel = 'Save') {
        super('player', title);
        this.players = players;
        this.buttonLabel = buttonLabel;
    }
    toModel() {
        return {
            title: this.title,
            buttonLabel: this.buttonLabel,
            type: 'player',
            players: this.players.map((player) => player.color),
        };
    }
    process(input) {
        if (!(0, InputResponse_1.isSelectPlayerResponse)(input)) {
            throw new InputError_1.InputError('Not a valid SelectPlayerResponse');
        }
        const foundPlayer = this.players.find((player) => player.color === input.player);
        if (foundPlayer === undefined) {
            throw new InputError_1.InputError('Player not available');
        }
        return this.cb(foundPlayer);
    }
}
exports.SelectPlayer = SelectPlayer;
