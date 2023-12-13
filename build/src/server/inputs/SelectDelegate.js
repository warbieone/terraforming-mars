"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectDelegate = void 0;
const PlayerInput_1 = require("../PlayerInput");
const InputResponse_1 = require("../../common/inputs/InputResponse");
class SelectDelegate extends PlayerInput_1.BasePlayerInput {
    constructor(players, title) {
        super('delegate', title);
        this.players = players;
    }
    toModel() {
        return {
            type: 'delegate',
            title: this.title,
            buttonLabel: this.buttonLabel,
            players: this.players.map((player) => player === 'NEUTRAL' ? 'NEUTRAL' : player.color),
        };
    }
    process(input) {
        if (!(0, InputResponse_1.isSelectDelegateResponse)(input)) {
            throw new Error('Not a valid SelectDelegateResponse');
        }
        for (const player of this.players) {
            if (player === 'NEUTRAL') {
                if (input.player !== 'NEUTRAL') {
                    continue;
                }
            }
            else {
                if (input.player !== player.color) {
                    continue;
                }
            }
            return this.cb(player);
        }
        throw new Error('Player not available');
    }
}
exports.SelectDelegate = SelectDelegate;
//# sourceMappingURL=SelectDelegate.js.map