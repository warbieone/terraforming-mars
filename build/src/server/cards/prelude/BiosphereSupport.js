"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BiosphereSupport = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const PreludeCard_1 = require("./PreludeCard");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class BiosphereSupport extends PreludeCard_1.PreludeCard {
    constructor() {
        super({
            name: CardName_1.CardName.BIOSPHERE_SUPPORT,
            tags: [Tag_1.Tag.PLANT],
            behavior: {
                production: { plants: 2, megacredits: -1 },
            },
            metadata: {
                cardNumber: 'P05',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => {
                        pb.minus().megacredits(1).br;
                        pb.plants(2);
                    });
                }),
                description: 'Increase your plant production 2 steps. Decrease your M€ production 1 step.',
            },
        });
    }
}
exports.BiosphereSupport = BiosphereSupport;
