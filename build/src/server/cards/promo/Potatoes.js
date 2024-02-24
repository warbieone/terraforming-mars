"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Potatoes = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class Potatoes extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.POTATOES,
            tags: [Tag_1.Tag.PLANT],
            cost: 2,
            behavior: {
                production: { megacredits: 2 },
            },
            metadata: {
                cardNumber: 'X28',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.minus().plants(2).nbsp.production((pb) => pb.megacredits(2));
                }),
                description: 'Lose 2 plants. Increase your M€ production 2 steps.',
            },
        });
    }
    bespokeCanPlay(player) {
        const viralEnhancers = player.playedCards.find((card) => card.name === CardName_1.CardName.VIRAL_ENHANCERS);
        const hasEnoughPlants = player.plants >= 2 || player.plants >= 1 && viralEnhancers !== undefined;
        return hasEnoughPlants;
    }
    bespokePlay(player) {
        player.plants -= 2;
        return undefined;
    }
}
exports.Potatoes = Potatoes;
