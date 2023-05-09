"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BribedCommittee = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class BribedCommittee extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.EVENT,
            name: CardName_1.CardName.BRIBED_COMMITTEE,
            tags: [Tag_1.Tag.EARTH],
            cost: 7,
            victoryPoints: -2,
            behavior: {
                tr: 2,
            },
            metadata: {
                cardNumber: '112',
                description: 'Raise your TR 2 steps.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => b.tr(2)),
            },
        });
    }
}
exports.BribedCommittee = BribedCommittee;
