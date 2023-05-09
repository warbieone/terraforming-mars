"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Incite = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const CardRenderer_1 = require("../render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
class Incite extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.INCITE,
            tags: [Tag_1.Tag.SCIENCE],
            startingMegaCredits: 32,
            type: CardType_1.CardType.CORPORATION,
            behavior: {
                turmoil: { influenceBonus: 1 },
            },
            firstAction: {
                text: 'Place 2 delegates in one party',
                turmoil: { sendDelegates: { count: 2 } },
            },
            metadata: {
                cardNumber: 'R37',
                description: 'You start with 32 M€. As your first action, place two delegates in one party.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.br.br;
                    b.megacredits(32).nbsp.delegates(2);
                    b.corpBox('effect', (ce) => {
                        ce.vSpace(Size_1.Size.LARGE);
                        ce.effect(undefined, (eb) => {
                            eb.empty().startEffect.influence();
                        });
                        ce.vSpace(Size_1.Size.SMALL);
                        ce.effect('You have +1 influence. When you send a delegate using the lobbying action, you pay 2 M€ less for it.', (eb) => {
                            eb.delegates(1).startEffect.megacredits(-2);
                        });
                    });
                }),
            },
        });
    }
}
exports.Incite = Incite;
