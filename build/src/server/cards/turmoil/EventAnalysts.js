"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventAnalysts = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const PartyName_1 = require("../../../common/turmoil/PartyName");
const CardRenderer_1 = require("../render/CardRenderer");
class EventAnalysts extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.EVENT_ANALYSTS,
            tags: [Tag_1.Tag.SCIENCE],
            cost: 5,
            behavior: {
                turmoil: { influenceBonus: 1 },
            },
            requirements: { party: PartyName_1.PartyName.SCIENTISTS },
            metadata: {
                description: 'Requires that Scientists are ruling or that you have 2 delegates there.',
                cardNumber: 'T05',
                renderData: CardRenderer_1.CardRenderer.builder((b) => b.effect('You have +1 influence.', (be) => {
                    be.startEffect.influence();
                })),
            },
        });
    }
}
exports.EventAnalysts = EventAnalysts;
