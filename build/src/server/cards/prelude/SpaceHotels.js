"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpaceHotels = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRequirements_1 = require("../CardRequirements");
const CardRenderer_1 = require("../render/CardRenderer");
class SpaceHotels extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.SPACE_HOTELS,
            tags: [Tag_1.Tag.SPACE, Tag_1.Tag.EARTH],
            cost: 12,
            behavior: {
                production: { megacredits: 4 },
            },
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.tag(Tag_1.Tag.EARTH, 2)),
            metadata: {
                cardNumber: 'P42',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => {
                        pb.megacredits(4);
                    });
                }),
                description: 'Requires 2 Earth tags. Increase M€ production 4 steps.',
            },
        });
    }
}
exports.SpaceHotels = SpaceHotels;
