"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WildlifeDome = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const PartyName_1 = require("../../../common/turmoil/PartyName");
const CardRequirements_1 = require("../CardRequirements");
const CardRenderer_1 = require("../render/CardRenderer");
class WildlifeDome extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.WILDLIFE_DOME,
            cost: 15,
            tags: [Tag_1.Tag.ANIMAL, Tag_1.Tag.PLANT, Tag_1.Tag.BUILDING],
            type: CardType_1.CardType.AUTOMATED,
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.party(PartyName_1.PartyName.GREENS)),
            behavior: {
                greenery: {},
            },
            metadata: {
                cardNumber: 'T15',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.greenery();
                }),
                description: 'Requires that Greens are ruling or that you have 2 delegates there. Place a greenery tile and raise oxygen 1 step.',
            },
        });
    }
}
exports.WildlifeDome = WildlifeDome;
