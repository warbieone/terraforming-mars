"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrbanDecomposers = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardResource_1 = require("../../../common/CardResource");
const CardRequirements_1 = require("../requirements/CardRequirements");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
class UrbanDecomposers extends Card_1.Card {
    constructor() {
        super({
            cost: 6,
            tags: [Tag_1.Tag.MICROBE],
            name: CardName_1.CardName.URBAN_DECOMPOSERS,
            type: CardType_1.CardType.AUTOMATED,
            behavior: {
                production: { plants: 1 },
                addResourcesToAnyCard: { count: 2, type: CardResource_1.CardResource.MICROBE },
            },
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.colonies().cities()),
            metadata: {
                cardNumber: 'C48',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.plants(1)).microbes(2).asterix();
                }),
                description: 'Requires that you have 1 city tile and 1 colony in play. Increase your plant production 1 step, and add 2 microbes to ANOTHER card.',
            },
        });
    }
    bespokeCanPlay(player) {
        let coloniesCount = 0;
        player.game.colonies.forEach((colony) => {
            coloniesCount += colony.colonies.filter((owner) => owner === player.id).length;
        });
        return coloniesCount > 0 && player.game.getCitiesCount(player) > 0;
    }
}
exports.UrbanDecomposers = UrbanDecomposers;
//# sourceMappingURL=UrbanDecomposers.js.map