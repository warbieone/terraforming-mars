"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Advertising = void 0;
const Card_1 = require("../Card");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const Resource_1 = require("../../../common/Resource");
const CardRenderer_1 = require("../render/CardRenderer");
class Advertising extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.ADVERTISING,
            tags: [Tag_1.Tag.EARTH],
            cost: 4,
            metadata: {
                cardNumber: 'X13',
                renderData: CardRenderer_1.CardRenderer.builder((b) => b.effect('When you play a card with a basic cost of 20 M€ or more, increase your M€ production 1 step.', (be) => {
                    be.megacredits(20).asterix().startEffect.production((pb) => pb.megacredits(1));
                })),
            },
        });
    }
    onCardPlayed(player, card) {
        if (card.cost >= 20) {
            player.production.add(Resource_1.Resource.MEGACREDITS, 1);
        }
    }
}
exports.Advertising = Advertising;
