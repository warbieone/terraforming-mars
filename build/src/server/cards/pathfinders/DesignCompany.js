"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DesignCompany = void 0;
const PreludeCard_1 = require("../prelude/PreludeCard");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Tag_1 = require("../../../common/cards/Tag");
class DesignCompany extends PreludeCard_1.PreludeCard {
    constructor() {
        super({
            name: CardName_1.CardName.DESIGN_COMPANY,
            tags: [Tag_1.Tag.MARS],
            behavior: {
                production: { steel: 1 },
                drawCard: { count: 3, tag: Tag_1.Tag.BUILDING },
            },
            metadata: {
                cardNumber: 'P08',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.steel(1)).br;
                    b.cards(3, { secondaryTag: Tag_1.Tag.BUILDING });
                }),
                description: 'Increase your steel production 1 step. Draw 3 cards with a building tag.',
            },
        });
    }
}
exports.DesignCompany = DesignCompany;
