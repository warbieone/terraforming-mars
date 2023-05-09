"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThoriumRush = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
const AltSecondaryTag_1 = require("../../../common/cards/render/AltSecondaryTag");
class ThoriumRush extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.THORIUM_RUSH,
            type: CardType_1.CardType.EVENT,
            tags: [Tag_1.Tag.MOON, Tag_1.Tag.BUILDING],
            cost: 39,
            behavior: {
                moon: {
                    habitatTile: {},
                    mineTile: {},
                    roadTile: {},
                },
            },
            metadata: {
                description: 'Place 1 habitat tile, 1 mining tile and 1 road tile on The Moon. ' +
                    'Raise the habitat rate, mining rate and logistic rate 1 step.',
                cardNumber: 'M56',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.moonHabitat({ secondaryTag: AltSecondaryTag_1.AltSecondaryTag.MOON_HABITAT_RATE })
                        .moonMine({ secondaryTag: AltSecondaryTag_1.AltSecondaryTag.MOON_MINING_RATE })
                        .moonRoad({ secondaryTag: AltSecondaryTag_1.AltSecondaryTag.MOON_LOGISTICS_RATE });
                }),
            },
        });
    }
}
exports.ThoriumRush = ThoriumRush;
