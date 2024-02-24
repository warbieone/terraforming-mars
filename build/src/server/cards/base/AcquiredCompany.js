"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcquiredCompany = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class AcquiredCompany extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.ACQUIRED_COMPANY,
            tags: [Tag_1.Tag.EARTH],
            cost: 10,
            behavior: {
                production: { megacredits: 3 },
            },
            metadata: {
                description: 'Increase your M€ production 3 steps.',
                cardNumber: '106',
                renderData: CardRenderer_1.CardRenderer.builder((b) => b.production((pb) => pb.megacredits(3))),
            },
        });
    }
}
exports.AcquiredCompany = AcquiredCompany;
