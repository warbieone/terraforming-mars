"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mine = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class Mine extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.MINE,
            tags: [Tag_1.Tag.BUILDING],
            cost: 4,
            behavior: {
                production: { steel: 1 },
            },
            metadata: {
                description: 'Increase your steel production 1 step.',
                cardNumber: '056',
                renderData: CardRenderer_1.CardRenderer.builder((b) => b.production((pb) => pb.steel(1))),
            },
        });
    }
}
exports.Mine = Mine;
