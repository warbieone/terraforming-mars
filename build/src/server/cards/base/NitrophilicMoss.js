"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NitrophilicMoss = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRequirements_1 = require("../CardRequirements");
const CardRenderer_1 = require("../render/CardRenderer");
class NitrophilicMoss extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.NITROPHILIC_MOSS,
            tags: [Tag_1.Tag.PLANT],
            cost: 8,
            behavior: {
                production: { plants: 2 },
            },
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.oceans(3)),
            metadata: {
                cardNumber: '146',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => {
                        pb.plants(2);
                    }).nbsp.minus().plants(2);
                }),
                description: 'Requires 3 ocean tiles and that you lose 2 plants. Increase your plant production 2 steps.',
            },
        });
    }
    bespokeCanPlay(player) {
        const viralEnhancers = player.playedCards.find((card) => card.name === CardName_1.CardName.VIRAL_ENHANCERS);
        const hasEnoughPlants = player.plants >= 2 || player.isCorporation(CardName_1.CardName.MANUTECH) || player.plants >= 1 && viralEnhancers !== undefined;
        return hasEnoughPlants;
    }
    bespokePlay(player) {
        player.plants -= 2;
        return undefined;
    }
}
exports.NitrophilicMoss = NitrophilicMoss;
//# sourceMappingURL=NitrophilicMoss.js.map