"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DarksideMeteorBombardment = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
class DarksideMeteorBombardment extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.DARKSIDE_METEOR_BOMBARDMENT,
            type: CardType_1.CardType.EVENT,
            tags: [Tag_1.Tag.SPACE],
            cost: 20,
            behavior: {
                stock: { steel: 2, titanium: 2 },
                moon: { miningRate: 2 },
            },
            metadata: {
                description: 'Gain 2 steel and 2 titanium. Raise the mining rate 2 steps.',
                cardNumber: 'M33',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.steel(2).titanium(2);
                    b.br;
                    b.moonMiningRate({ amount: 2 });
                }),
            },
        });
    }
}
exports.DarksideMeteorBombardment = DarksideMeteorBombardment;
