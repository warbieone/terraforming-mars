"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Soletta = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class Soletta extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.SOLETTA,
            tags: [Tag_1.Tag.SPACE],
            cost: 35,
            behavior: {
                production: { heat: 7 },
            },
            metadata: {
                cardNumber: '203',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.heat(7));
                }),
                description: 'Increase your heat production 7 steps.',
            },
        });
    }
}
exports.Soletta = Soletta;
