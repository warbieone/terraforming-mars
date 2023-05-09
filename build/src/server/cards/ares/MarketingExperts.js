"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketingExperts = void 0;
const Card_1 = require("../Card");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardRenderer_1 = require("../render/CardRenderer");
class MarketingExperts extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.MARKETING_EXPERTS,
            tags: [Tag_1.Tag.EARTH],
            cost: 5,
            behavior: {
                production: { megacredits: 1 },
            },
            metadata: {
                cardNumber: 'A12',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.effect('When an ADJACENCY BONUS is collected from a tile you own, you gain 1 M€.', (eb) => {
                        eb.emptyTile().emptyTile('golden').startEffect.megacredits(1);
                    }).br;
                    b.production((pb) => pb.megacredits(1));
                }),
                description: 'Increase your M€ production 1 step.',
            },
        });
    }
}
exports.MarketingExperts = MarketingExperts;
