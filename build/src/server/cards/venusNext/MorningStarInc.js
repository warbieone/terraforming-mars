"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MorningStarInc = void 0;
const CorporationCard_1 = require("../corporation/CorporationCard");
const Tag_1 = require("../../../common/cards/Tag");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const GlobalParameter_1 = require("../../../common/GlobalParameter");
class MorningStarInc extends CorporationCard_1.CorporationCard {
    constructor() {
        super({
            name: CardName_1.CardName.MORNING_STAR_INC,
            tags: [Tag_1.Tag.VENUS],
            startingMegaCredits: 50,
            globalParameterRequirementBonus: { steps: 3, parameter: GlobalParameter_1.GlobalParameter.VENUS },
            firstAction: {
                text: 'Draw 3 cards with a Venus tag',
                drawCard: { count: 3, tag: Tag_1.Tag.VENUS },
            },
            cardDiscount: { tag: Tag_1.Tag.VENUS, amount: 1 },
            metadata: {
                cardNumber: 'R06',
                description: 'You start with 50 M€. As your first action, reveal cards from the deck until you have revealed 3 Venus-tag cards. Take those into hand and discard the rest.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.megacredits(50).nbsp.cards(3, { secondaryTag: Tag_1.Tag.VENUS });
                    b.corpBox('effect', (ce) => {
                        ce.effect('Your Venus requirements are +/- 3 steps.', (eb) => {
                            eb.plate('Venus requirements').startEffect.text('+/- 3');
                        });
                        ce.effect('When you play a Venus tag, you pay 1 M€ less for it.', (eb) => {
                            eb.venus(1).startEffect.megacredits(-1);
                        });
                    });
                }),
            },
        });
    }
}
exports.MorningStarInc = MorningStarInc;
//# sourceMappingURL=MorningStarInc.js.map