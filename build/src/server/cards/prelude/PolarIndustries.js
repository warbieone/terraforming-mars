"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PolarIndustries = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const PreludeCard_1 = require("./PreludeCard");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class PolarIndustries extends PreludeCard_1.PreludeCard {
    constructor() {
        super({
            name: CardName_1.CardName.POLAR_INDUSTRIES,
            tags: [Tag_1.Tag.BUILDING],
            behavior: {
                production: { heat: 2 },
                ocean: {},
            },
            metadata: {
                cardNumber: 'P26',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.heat(2)).br;
                    b.oceans(1);
                }),
                description: 'Increase your heat production 2 steps. Place an ocean tile.',
            },
        });
    }
}
exports.PolarIndustries = PolarIndustries;
