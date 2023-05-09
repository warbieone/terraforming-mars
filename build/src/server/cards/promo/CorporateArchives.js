"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CorporateArchives = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const PreludeCard_1 = require("../prelude/PreludeCard");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
class CorporateArchives extends PreludeCard_1.PreludeCard {
    constructor() {
        super({
            name: CardName_1.CardName.CORPORATE_ARCHIVES,
            tags: [Tag_1.Tag.SCIENCE],
            behavior: {
                drawCard: { count: 7, keep: 2 },
                stock: { megacredits: 13 },
            },
            metadata: {
                cardNumber: 'X58',
                description: 'Gain 13 M€',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.text('Look at the top 7 cards from the deck. Take 2 of them into hand and discard the other 5.', Size_1.Size.SMALL, true);
                    b.br;
                    b.megacredits(13);
                }),
            },
        });
    }
}
exports.CorporateArchives = CorporateArchives;
