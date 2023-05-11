"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoholeExcavation = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const PreludeCard_1 = require("./PreludeCard");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class MoholeExcavation extends PreludeCard_1.PreludeCard {
    constructor() {
        super({
            name: CardName_1.CardName.MOHOLE_EXCAVATION,
            tags: [Tag_1.Tag.BUILDING],
            behavior: {
                production: { steel: 1, heat: 2 },
                stock: { steel: 5 },
            },
            metadata: {
                cardNumber: 'P23',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => {
                        pb.steel(1).br;
                        pb.heat(2);
                    }).steel(5);
                }),
                description: 'Increase your steel production 1 step and heat production 2 steps. Gain 5 steel.',
            },
        });
    }
}
exports.MoholeExcavation = MoholeExcavation;
