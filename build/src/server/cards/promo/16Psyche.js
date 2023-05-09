"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Psyche = void 0;
const Card_1 = require("../Card");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardRenderer_1 = require("../render/CardRenderer");
class Psyche extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.PSYCHE,
            tags: [Tag_1.Tag.SPACE],
            cost: 31,
            victoryPoints: 2,
            behavior: {
                production: { titanium: 2 },
                stock: { titanium: 3 },
            },
            metadata: {
                cardNumber: 'X44',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.titanium(2)).br.titanium(3);
                }),
                description: 'Increase titanium production 2 steps. Gain 3 titanium.',
            },
        });
    }
}
exports.Psyche = Psyche;
