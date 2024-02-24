"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TitaniumMine = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class TitaniumMine extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.TITANIUM_MINE,
            tags: [Tag_1.Tag.BUILDING],
            cost: 7,
            behavior: {
                production: { titanium: 1 },
            },
            metadata: {
                cardNumber: '144',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.titanium(1));
                }),
                description: 'Increase your titanium production 1 step.',
            },
        });
    }
}
exports.TitaniumMine = TitaniumMine;
