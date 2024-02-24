"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Supplier = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const PreludeCard_1 = require("./PreludeCard");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class Supplier extends PreludeCard_1.PreludeCard {
    constructor() {
        super({
            name: CardName_1.CardName.SUPPLIER,
            tags: [Tag_1.Tag.POWER],
            behavior: {
                production: { energy: 2 },
                stock: { steel: 4 },
            },
            metadata: {
                cardNumber: 'P32',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.energy(2)).br;
                    b.steel(4);
                }),
                description: 'Increase your energy production 2 steps. Gain 4 steel.',
            },
        });
    }
}
exports.Supplier = Supplier;
