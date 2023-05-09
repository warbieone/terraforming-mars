"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannedDelegate = void 0;
const Card_1 = require("../Card");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const OrOptions_1 = require("../../inputs/OrOptions");
const SelectDelegate_1 = require("../../inputs/SelectDelegate");
const CardRequirements_1 = require("../CardRequirements");
const CardRenderer_1 = require("../render/CardRenderer");
const Turmoil_1 = require("../../turmoil/Turmoil");
const Options_1 = require("../Options");
const mnemonist_1 = require("mnemonist");
class BannedDelegate extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.EVENT,
            name: CardName_1.CardName.BANNED_DELEGATE,
            cost: 0,
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.chairman()),
            metadata: {
                cardNumber: 'T02',
                description: 'Requires that you are Chairman. Remove any NON-LEADER delegate.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.minus().delegates(1, { all: Options_1.all });
                }),
            },
        });
    }
    bespokePlay(player) {
        const turmoil = Turmoil_1.Turmoil.getTurmoil(player.game);
        const orOptions = [];
        turmoil.parties.forEach((party) => {
            if (party.delegates.size > 1) {
                const copy = mnemonist_1.MultiSet.from(party.delegates);
                if (party.partyLeader !== undefined) {
                    copy.remove(party.partyLeader);
                }
                else {
                    throw new Error(`partyLeader not defined for ${player.game.id}`);
                }
                const players = [];
                for (const playerId of copy) {
                    if (playerId === 'NEUTRAL') {
                        players.push('NEUTRAL');
                    }
                    else {
                        players.push(player.game.getPlayerById(playerId));
                    }
                }
                if (players.length > 0) {
                    const selectDelegate = new SelectDelegate_1.SelectDelegate(players, 'Select player delegate to remove from ' + party.name + ' party', (selectedPlayer) => {
                        let playerToRemove;
                        if (selectedPlayer === 'NEUTRAL') {
                            playerToRemove = 'NEUTRAL';
                        }
                        else {
                            playerToRemove = selectedPlayer.id;
                        }
                        turmoil.removeDelegateFromParty(playerToRemove, party.name, player.game);
                        this.log(player, party, selectedPlayer);
                        return undefined;
                    });
                    selectDelegate.buttonLabel = 'Remove delegate';
                    orOptions.push(selectDelegate);
                }
            }
        });
        if (orOptions.length === 0) {
            return undefined;
        }
        else if (orOptions.length === 1) {
            return orOptions[0];
        }
        else {
            const options = new OrOptions_1.OrOptions(...orOptions);
            return options;
        }
    }
    log(player, party, selectedPlayer) {
        if (selectedPlayer === 'NEUTRAL') {
            player.game.log('${0} removed neutral delegate from ${1}', (b) => b.player(player).party(party));
        }
        else {
            player.game.log('${0} removed ${1}\'s delegate from ${2}', (b) => b.player(player).player(selectedPlayer).party(party));
        }
    }
}
exports.BannedDelegate = BannedDelegate;
