"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VenusFirst = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const PreludeCard_1 = require("../prelude/PreludeCard");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class VenusFirst extends PreludeCard_1.PreludeCard {
    constructor() {
        super({
            name: CardName_1.CardName.VENUS_FIRST,
            tags: [Tag_1.Tag.VENUS],
            behavior: {
                drawCard: { count: 2, tag: Tag_1.Tag.VENUS },
                global: { venus: 2 },
            },
            metadata: {
                cardNumber: 'Y07',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.venus(2).br.br;
                    b.cards(2, { secondaryTag: Tag_1.Tag.VENUS });
                }),
                description: 'Raise Venus 2 steps. Draw 2 Venus cards from the deck.',
            },
        });
    }
}
exports.VenusFirst = VenusFirst;
