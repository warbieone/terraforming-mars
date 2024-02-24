"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiningOperations = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const PreludeCard_1 = require("./PreludeCard");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class MiningOperations extends PreludeCard_1.PreludeCard {
    constructor() {
        super({
            name: CardName_1.CardName.MINING_OPERATIONS,
            tags: [Tag_1.Tag.BUILDING],
            behavior: {
                production: { steel: 2 },
                stock: { steel: 4 },
            },
            metadata: {
                cardNumber: 'P21',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.steel(2)).br;
                    b.steel(4);
                }),
                description: 'Increase your steel production 2 steps. Gain 4 steel.',
            },
        });
    }
}
exports.MiningOperations = MiningOperations;
