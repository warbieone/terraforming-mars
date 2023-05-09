"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdvancedEcosystems = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRequirements_1 = require("../CardRequirements");
class AdvancedEcosystems extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.ADVANCED_ECOSYSTEMS,
            tags: [Tag_1.Tag.PLANT, Tag_1.Tag.MICROBE, Tag_1.Tag.ANIMAL],
            cost: 11,
            victoryPoints: 3,
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.tag(Tag_1.Tag.PLANT).tag(Tag_1.Tag.ANIMAL).tag(Tag_1.Tag.MICROBE)),
            metadata: {
                description: 'Requires a plant tag, a microbe tag, and an animal tag.',
                cardNumber: '135',
            },
        });
    }
}
exports.AdvancedEcosystems = AdvancedEcosystems;
