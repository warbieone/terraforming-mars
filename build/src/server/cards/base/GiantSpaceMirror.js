"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GiantSpaceMirror = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class GiantSpaceMirror extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.GIANT_SPACE_MIRROR,
            tags: [Tag_1.Tag.POWER, Tag_1.Tag.SPACE],
            cost: 17,
            behavior: {
                production: { energy: 3 },
            },
            metadata: {
                cardNumber: '083',
                renderData: CardRenderer_1.CardRenderer.builder((b) => b.production((pb) => pb.energy(3))),
                description: 'Increase your energy production 3 steps.',
            },
        });
    }
}
exports.GiantSpaceMirror = GiantSpaceMirror;
