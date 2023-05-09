"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inventrix = void 0;
const Card_1 = require("../Card");
const Tag_1 = require("../../../common/cards/Tag");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const CardRenderer_1 = require("../render/CardRenderer");
class Inventrix extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.CORPORATION,
            name: CardName_1.CardName.INVENTRIX,
            tags: [Tag_1.Tag.SCIENCE],
            startingMegaCredits: 45,
            firstAction: {
                text: 'Draw 3 cards',
                drawCard: 3,
            },
            metadata: {
                cardNumber: 'R43',
                description: 'As your first action in the game, draw 3 cards. Start with 45 M€.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.br;
                    b.megacredits(45).nbsp.cards(3);
                    b.corpBox('effect', (ce) => {
                        ce.effect('Your temperature, oxygen, ocean, and Venus requirements are +2 or -2 steps, your choice in each case.', (eb) => {
                            eb.plate('Global requirements').startEffect.text('+/- 2');
                        });
                    });
                }),
            },
        });
    }
    getRequirementBonus() {
        return 2;
    }
}
exports.Inventrix = Inventrix;
