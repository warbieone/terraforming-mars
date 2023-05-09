"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonsInsurance = void 0;
const Resource_1 = require("../../../common/Resource");
const Card_1 = require("../Card");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const CardRenderer_1 = require("../render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
const Options_1 = require("../Options");
class MonsInsurance extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.CORPORATION,
            name: CardName_1.CardName.MONS_INSURANCE,
            startingMegaCredits: 48,
            behavior: {
                production: { megacredits: 4 },
            },
            metadata: {
                cardNumber: 'R46',
                description: 'You start with 48 M€. Increase your M€ production 4 steps. ALL OPPONENTS DECREASE THEIR M€ production 2 STEPS. THIS DOES NOT TRIGGER THE EFFECT BELOW.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.megacredits(48).production((pb) => {
                        pb.megacredits(4).nbsp.megacredits(-2, { all: Options_1.all }).asterix();
                    });
                    b.corpBox('effect', (cb) => {
                        cb.vSpace(Size_1.Size.SMALL);
                        cb.effect('When a player causes another player to decrease production or lose resources, pay 3M€ to the victim, or as much as possible.', (eb) => {
                            eb.production((pb) => pb.wild(1, { all: Options_1.all })).or().minus().wild(1, { all: Options_1.all });
                            eb.startEffect.text('pay', Size_1.Size.SMALL, true).megacredits(3);
                        });
                    });
                }),
            },
        });
    }
    bespokePlay(player) {
        for (const p of player.game.getPlayers()) {
            if (p.id !== player.id) {
                p.production.add(Resource_1.Resource.MEGACREDITS, -2, { log: true });
            }
        }
        player.game.monsInsuranceOwner = player.id;
        return undefined;
    }
    payDebt(player, claimant) {
        if (player !== claimant) {
            const retribution = Math.min(player.megaCredits, 3);
            if (claimant)
                claimant.megaCredits += retribution;
            player.deductResource(Resource_1.Resource.MEGACREDITS, retribution);
            if (retribution > 0) {
                if (claimant !== undefined) {
                    player.game.log('${0} received ${1} M€ from ${2} owner (${3})', (b) => b.player(claimant)
                        .number(retribution)
                        .cardName(CardName_1.CardName.MONS_INSURANCE)
                        .player(player));
                }
                else {
                    player.game.log('Neutral player received ${0} M€ from ${1} owner (${2})', (b) => b.number(retribution)
                        .cardName(CardName_1.CardName.MONS_INSURANCE)
                        .player(player));
                }
            }
        }
    }
}
exports.MonsInsurance = MonsInsurance;
