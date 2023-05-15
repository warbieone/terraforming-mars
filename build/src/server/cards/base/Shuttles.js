"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shuttles = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const CardRequirements_1 = require("../CardRequirements");
const Options_1 = require("../Options");
class Shuttles extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.SHUTTLES,
            tags: [Tag_1.Tag.SPACE],
            cost: 10,
            victoryPoints: 1,
            behavior: {
                production: { energy: -1, megacredits: 2 },
            },
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.oxygen(5)),
            cardDiscount: { tag: Tag_1.Tag.SPACE, amount: 2 },
            metadata: {
                cardNumber: '166',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.effect('When you play a space card, you pay 2 M€ less for it.', (eb) => {
                        eb.space({ played: Options_1.played }).startEffect.megacredits(-2);
                    }).br;
                    b.production((pb) => {
                        pb.minus().energy(1).nbsp;
                        pb.plus().megacredits(2);
                    });
                }),
                description: {
                    text: 'Requires 5% oxygen. Decrease your energy production 1 step and increase your M€ production 2 steps.',
                    align: 'left',
                },
            },
        });
    }
}
exports.Shuttles = Shuttles;
//# sourceMappingURL=Shuttles.js.map