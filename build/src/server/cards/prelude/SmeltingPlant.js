"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmeltingPlant = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const PreludeCard_1 = require("./PreludeCard");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class SmeltingPlant extends PreludeCard_1.PreludeCard {
    constructor() {
        super({
            name: CardName_1.CardName.SMELTING_PLANT,
            tags: [Tag_1.Tag.BUILDING],
            behavior: {
                stock: { steel: 5 },
                global: { oxygen: 2 },
            },
            metadata: {
                cardNumber: 'P30',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.oxygen(2).br;
                    b.steel(5);
                }),
                description: 'Raise oxygen 2 steps. Gain 5 steel.',
            },
        });
    }
}
exports.SmeltingPlant = SmeltingPlant;
