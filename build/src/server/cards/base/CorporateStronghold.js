"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CorporateStronghold = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class CorporateStronghold extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.CORPORATE_STRONGHOLD,
            tags: [Tag_1.Tag.CITY, Tag_1.Tag.BUILDING],
            cost: 11,
            behavior: {
                production: { energy: -1, megacredits: 3 },
                city: {},
            },
            victoryPoints: -2,
            metadata: {
                cardNumber: '182',
                description: 'Decrease your energy production 1 step and increase your M€ production 3 steps. Place a city tile.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => {
                        pb.minus().energy(1).br;
                        pb.plus().megacredits(3);
                    }).nbsp.nbsp.city();
                }),
            },
        });
    }
}
exports.CorporateStronghold = CorporateStronghold;
