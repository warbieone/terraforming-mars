"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LuxuryEstate = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Tag_1 = require("../../../common/cards/Tag");
const CardRequirements_1 = require("../CardRequirements");
const Size_1 = require("../../../common/cards/render/Size");
class LuxuryEstate extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.LUXURY_ESTATE,
            cost: 12,
            tags: [Tag_1.Tag.EARTH, Tag_1.Tag.MARS, Tag_1.Tag.BUILDING],
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.oxygen(7)),
            behavior: {
                stock: { titanium: { cities: {}, greeneries: {}, all: false } },
            },
            metadata: {
                cardNumber: 'Pf21',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.titanium(1).slash().city().plus().greenery(Size_1.Size.MEDIUM, false);
                }),
                description: 'Oxygen must be 7% or greater. Gain 1 titanium for each city tile and greenery tile you own.',
            },
        });
    }
}
exports.LuxuryEstate = LuxuryEstate;
