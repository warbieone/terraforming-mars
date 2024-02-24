"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LunarBeam = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class LunarBeam extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.LUNAR_BEAM,
            tags: [Tag_1.Tag.EARTH, Tag_1.Tag.POWER],
            cost: 13,
            behavior: {
                production: { megacredits: -2, heat: 2, energy: 2 },
            },
            metadata: {
                cardNumber: '030',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => {
                        pb.minus().megacredits(2).br;
                        pb.plus().heat(2).br;
                        pb.plus().energy(2);
                    });
                }),
                description: 'Decrease your M€ production 2 steps and increase your heat production and energy production 2 steps each.',
            },
        });
    }
}
exports.LunarBeam = LunarBeam;
