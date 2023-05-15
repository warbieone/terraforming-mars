"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlliedBanks = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const PreludeCard_1 = require("./PreludeCard");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class AlliedBanks extends PreludeCard_1.PreludeCard {
    constructor() {
        super({
            name: CardName_1.CardName.ALLIED_BANK,
            tags: [Tag_1.Tag.EARTH],
            behavior: {
                production: { megacredits: 4 },
                stock: { megacredits: 3 },
            },
            metadata: {
                cardNumber: 'P01',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.megacredits(4)).br;
                    b.megacredits(3);
                }),
                description: 'Increase your M€ production 4 steps. Gain 3 M€.',
            },
        });
    }
}
exports.AlliedBanks = AlliedBanks;
//# sourceMappingURL=AlliedBanks.js.map