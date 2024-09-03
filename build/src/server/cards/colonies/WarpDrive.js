"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WarpDrive = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
class WarpDrive extends Card_1.Card {
    constructor() {
        super({
            cost: 16,
            tags: [Tag_1.Tag.SCIENCE],
            name: CardName_1.CardName.WARP_DRIVE,
            type: CardType_1.CardType.ACTIVE,
            victoryPoints: 2,
            requirements: { tag: Tag_1.Tag.SCIENCE, count: 5 },
            cardDiscount: { tag: Tag_1.Tag.SPACE, amount: 4 },
            metadata: {
                cardNumber: 'C49',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.effect('When you play a space card, you pay 4 M€ less for it.', (eb) => {
                        eb.tag(Tag_1.Tag.SPACE).startEffect.megacredits(-4);
                    });
                }),
                description: 'Requires 5 science tags.',
            },
        });
    }
}
exports.WarpDrive = WarpDrive;
