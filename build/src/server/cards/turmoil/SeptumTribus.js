"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeptumTribus = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const CardRenderer_1 = require("../render/CardRenderer");
const Resource_1 = require("../../../common/Resource");
const Turmoil_1 = require("../../turmoil/Turmoil");
class SeptumTribus extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.SEPTUM_TRIBUS,
            tags: [Tag_1.Tag.WILD],
            startingMegaCredits: 36,
            type: CardType_1.CardType.CORPORATION,
            metadata: {
                cardNumber: 'R15',
                description: 'You start with 36 M€. When you perform an action, the wild tag counts as any tag of your choice.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.br;
                    b.megacredits(36);
                    b.corpBox('action', (ce) => {
                        ce.action('Gain 2 M€ for each party where you have at least 1 delegate.', (eb) => {
                            eb.empty().startAction.megacredits(2).slash().delegates(1).asterix();
                        });
                    });
                }),
            },
        });
    }
    canAct() {
        return true;
    }
    action(player) {
        const turmoil = Turmoil_1.Turmoil.getTurmoil(player.game);
        const partiesWithPresence = turmoil.parties.filter((party) => party.delegates.has(player.id));
        player.addResource(Resource_1.Resource.MEGACREDITS, partiesWithPresence.length * 2, { log: true });
        return undefined;
    }
}
exports.SeptumTribus = SeptumTribus;
