"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MorningStarInc = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const CardRenderer_1 = require("../render/CardRenderer");
const GlobalParameter_1 = require("../../../common/GlobalParameter");
class MorningStarInc extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.MORNING_STAR_INC,
            tags: [Tag_1.Tag.VENUS],
            startingMegaCredits: 50,
            type: CardType_1.CardType.CORPORATION,
            firstAction: {
                text: 'Draw 3 cards with a Venus tag',
                drawCard: { count: 3, tag: Tag_1.Tag.VENUS },
            },
            metadata: {
                cardNumber: 'R06',
                description: 'You start with 50 M€. As your first action, reveal cards from the deck until you have revealed 3 Venus-tag cards. Take those into hand and discard the rest.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.megacredits(50).nbsp.cards(3, { secondaryTag: Tag_1.Tag.VENUS });
                    b.corpBox('effect', (ce) => {
                        ce.effect('Your Venus requirements are +/- 2 steps, your choice in each case.', (eb) => {
                            eb.plate('Venus requirements').startEffect.text('+/- 2');
                        });
                    });
                }),
            },
        });
    }
    getRequirementBonus(_player, parameter) {
        return parameter === GlobalParameter_1.GlobalParameter.VENUS ? 2 : 0;
    }
}
exports.MorningStarInc = MorningStarInc;
