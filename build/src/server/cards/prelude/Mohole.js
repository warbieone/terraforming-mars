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
                production: { heat: 2, energy: 1 },
                stock: { heat: 5, energy: 3 },
            },
            metadata: {
                cardNumber: 'P22',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.heat(2).energy(1)).br;
                    b.heat(5).br;
                    b.energy(3);
                }),
                description: 'Increase your heat production 2 steps and energy production 1 step. Gain 3 energy and 5 heat',
            },
        });
    }
}
exports.Mohole = Mohole;
//# sourceMappingURL=Mohole.js.map