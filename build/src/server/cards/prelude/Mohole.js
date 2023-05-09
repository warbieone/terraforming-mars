"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mohole = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const PreludeCard_1 = require("./PreludeCard");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class Mohole extends PreludeCard_1.PreludeCard {
    constructor() {
        super({
            name: CardName_1.CardName.MOHOLE,
            tags: [Tag_1.Tag.BUILDING],
            behavior: {
                production: { heat: 3 },
                stock: { heat: 3 },
            },
            metadata: {
                cardNumber: 'P22',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.heat(3)).br;
                    b.heat(3);
                }),
                description: 'Increase your heat production 3 steps. Gain 3 heat.',
            },
        });
    }
}
exports.Mohole = Mohole;
