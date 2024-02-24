"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrbitalReflectors = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
class OrbitalReflectors extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.ORBITAL_REFLECTORS,
            type: CardType_1.CardType.AUTOMATED,
            tags: [Tag_1.Tag.VENUS, Tag_1.Tag.SPACE],
            cost: 26,
            behavior: {
                production: { heat: 2 },
                global: { venus: 2 },
            },
            metadata: {
                cardNumber: '242',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.venus(2).br;
                    b.production((pb) => {
                        pb.heat(2);
                    });
                }),
                description: 'Raise Venus 2 steps. Increase your heat production 2 steps.',
            },
        });
    }
}
exports.OrbitalReflectors = OrbitalReflectors;
