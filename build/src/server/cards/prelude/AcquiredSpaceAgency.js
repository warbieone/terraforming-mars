"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcquiredSpaceAgency = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const PreludeCard_1 = require("./PreludeCard");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class AcquiredSpaceAgency extends PreludeCard_1.PreludeCard {
    constructor() {
        super({
            name: CardName_1.CardName.ACQUIRED_SPACE_AGENCY,
            behavior: {
                stock: { titanium: 6 },
                drawCard: { count: 2, tag: Tag_1.Tag.SPACE },
            },
            metadata: {
                cardNumber: 'P35',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.titanium(6, { digit: true }).br.br;
                    b.cards(2, { secondaryTag: Tag_1.Tag.SPACE });
                }),
                description: 'Gain 6 titanium. Reveal cards until you reveal two cards with Space Tags. Take them into your hand, discard the rest.',
            },
        });
    }
}
exports.AcquiredSpaceAgency = AcquiredSpaceAgency;
