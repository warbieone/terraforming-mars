"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Party = void 0;
const mnemonist_1 = require("mnemonist");
const CardName_1 = require("../../../common/cards/CardName");
class Party {
    constructor() {
        this.partyLeader = undefined;
        this.delegates = new mnemonist_1.MultiSet();
    }
    sendDelegate(delegate, game) {
        this.delegates.add(delegate);
        this.checkPartyLeader(delegate, game);
    }
    removeDelegate(delegate, game) {
        this.delegates.remove(delegate);
        this.checkPartyLeader(delegate, game);
    }
    setPartyLeader(delegate, game) {
        this.partyLeader = delegate;
        const cardPlayer = game.getCardPlayerOrUndefined(CardName_1.CardName.CORRIDORS_OF_POWER);
        if (cardPlayer === delegate) {
            cardPlayer.drawCard();
        }
    }
    checkPartyLeader(delegate, game) {
        const players = game.getPlayersInGenerationOrder();
        if (this.delegates.size === 0) {
            this.partyLeader = undefined;
            return;
        }
        if (this.partyLeader === undefined) {
            this.setPartyLeader(delegate, game);
            if (this.partyLeader === undefined) {
                throw new Error('Assertion error, party leader is defined');
            }
        }
        const max = this.delegates.top(1)[0][1];
        if (this.delegates.count(this.partyLeader) !== max) {
            let currentIndex = 0;
            if (this.partyLeader === 'NEUTRAL') {
                currentIndex = players.indexOf(game.getPlayerById(game.activePlayer));
            }
            else {
                currentIndex = players.indexOf(this.partyLeader);
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
                if (this.delegates.get(nextPlayer) === max) {
                    this.setPartyLeader(nextPlayer, game);
                    return true;
                }
                return false;
            });
        }
    }
}
exports.Party = Party;
