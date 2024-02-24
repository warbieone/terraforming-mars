"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Moss = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class Moss extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.MOSS,
            tags: [Tag_1.Tag.PLANT],
            cost: 4,
            behavior: {
                production: { plants: 1 },
            },
            requirements: { oceans: 3 },
            metadata: {
                cardNumber: '122',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.plants(1)).nbsp.minus().plants(1);
                }),
                description: 'Requires 3 ocean tiles and that you lose 1 plant. Increase your plant production 1 step.',
            },
        });
    }
    bespokeCanPlay(player) {
        const hasViralEnhancers = player.playedCards.find((card) => card.name === CardName_1.CardName.VIRAL_ENHANCERS);
        const hasEnoughPlants = player.plants >= 1 || hasViralEnhancers !== undefined || player.isCorporation(CardName_1.CardName.MANUTECH);
        return hasEnoughPlants;
    }
    bespokePlay(player) {
        player.plants--;
        return undefined;
    }
}
exports.Moss = Moss;
