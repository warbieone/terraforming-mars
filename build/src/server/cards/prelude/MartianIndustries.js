"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MartianIndustries = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const PreludeCard_1 = require("./PreludeCard");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class MartianIndustries extends PreludeCard_1.PreludeCard {
    constructor() {
        super({
            name: CardName_1.CardName.MARTIAN_INDUSTRIES,
            tags: [Tag_1.Tag.BUILDING],
            behavior: {
                production: { energy: 1, steel: 1 },
                stock: { megacredits: 6 },
            },
            metadata: {
                cardNumber: 'P18',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.energy(1).steel(1)).br;
                    b.megacredits(6);
                }),
                description: 'Increase your energy and steel production 1 step. Gain 6 M€.',
            },
        });
    }
}
exports.MartianIndustries = MartianIndustries;
