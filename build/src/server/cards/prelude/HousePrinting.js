"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HousePrinting = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const Card_1 = require("../Card");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class HousePrinting extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.HOUSE_PRINTING,
            tags: [Tag_1.Tag.BUILDING],
            cost: 10,
            behavior: {
                production: { steel: 1 },
            },
            victoryPoints: 1,
            metadata: {
                cardNumber: 'P36',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.steel(1));
                }),
                description: 'Increase your steel production 1 step.',
            },
        });
    }
}
exports.HousePrinting = HousePrinting;
