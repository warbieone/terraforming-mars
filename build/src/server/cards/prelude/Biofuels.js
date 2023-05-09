"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Biofuels = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const PreludeCard_1 = require("./PreludeCard");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class Biofuels extends PreludeCard_1.PreludeCard {
    constructor() {
        super({
            name: CardName_1.CardName.BIOFUELS,
            tags: [Tag_1.Tag.MICROBE],
            behavior: {
                production: { energy: 1, plants: 1 },
                stock: { plants: 2 },
            },
            metadata: {
                cardNumber: 'P03',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.energy(1).plants(1)).br;
                    b.plants(2);
                }),
                description: 'Increase your energy and plant production 1 step. Gain 2 plants.',
            },
        });
    }
}
exports.Biofuels = Biofuels;
