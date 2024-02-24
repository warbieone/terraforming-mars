"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GreatDam = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class GreatDam extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.GREAT_DAM,
            tags: [Tag_1.Tag.POWER, Tag_1.Tag.BUILDING],
            cost: 12,
            behavior: {
                production: { energy: 2 },
            },
            victoryPoints: 1,
            requirements: { oceans: 4 },
            metadata: {
                cardNumber: '136',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.energy(2));
                }),
                description: 'Requires 4 ocean tiles. Increase your energy production 2 steps.',
            },
        });
    }
}
exports.GreatDam = GreatDam;
