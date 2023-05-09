"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Party = void 0;
const mnemonist_1 = require("mnemonist");
class Party {
    constructor() {
        this.partyLeader = undefined;
        this.delegates = new mnemonist_1.MultiSet();
    }
    sendDelegate(playerId, game) {
        this.delegates.add(playerId);
        this.checkPartyLeader(playerId, game);
    }
    removeDelegate(playerId, game) {
        this.delegates.remove(playerId);
        this.checkPartyLeader(playerId, game);
    }
    checkPartyLeader(newPlayer, game) {
        const players = game.getPlayersInGenerationOrder();
        if (this.partyLeader) {
            const max = this.delegates.top(1)[0][1];
            if (this.delegates.count(this.partyLeader) !== max) {
                let currentIndex = 0;
                if (this.partyLeader === 'NEUTRAL') {
                    currentIndex = players.indexOf(game.getPlayerById(game.activePlayer));
                }
                else {
                    currentIndex = players.indexOf(game.getPlayerById(this.partyLeader));
                }
                let playersToCheck = [];
                if (players.length === 1 || currentIndex === 0) {
                    playersToCheck = [...players];
                }
                else if (currentIndex === players.length - 1) {
                    playersToCheck = players.slice(0, currentIndex);
                    playersToCheck.unshift(players[currentIndex]);
                }
                else {
                    const left = players.slice(0, currentIndex);
                    const right = players.slice(currentIndex);
                    playersToCheck = right.concat(left);
                }
                playersToCheck.push('NEUTRAL');
                playersToCheck.some((nextPlayer) => {
                    let nextPlayerId;
                    if (nextPlayer === 'NEUTRAL') {
                        nextPlayerId = 'NEUTRAL';
                    }
                    else {
                        nextPlayerId = nextPlayer.id;
                    }
                    if (this.delegates.get(nextPlayerId) === max) {
                        this.partyLeader = nextPlayerId;
                        return true;
                    }
                    return false;
                });
            }
        }
        else {
            this.partyLeader = newPlayer;
        }
    }
}
exports.Party = Party;
