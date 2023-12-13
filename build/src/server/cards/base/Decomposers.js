"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Decomposers = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardResource_1 = require("../../../common/CardResource");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Phase_1 = require("../../../common/Phase");
const Options_1 = require("../Options");
class Decomposers extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.DECOMPOSERS,
            tags: [Tag_1.Tag.MICROBE],
            cost: 5,
            resourceType: CardResource_1.CardResource.MICROBE,
            victoryPoints: { resourcesHere: {}, per: 3 },
            requirements: { oxygen: 3 },
            metadata: {
                cardNumber: '131',
                description: 'Requires 3% oxygen.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.effect('When you play an animal, plant, or microbe tag, including this, add a microbe to this card.', (be) => {
                        be.animals(1, { played: Options_1.played }).slash();
                        be.plants(1, { played: Options_1.played }).slash();
                        be.microbes(1, { played: Options_1.played });
                        be.startEffect.microbes(1);
                    }).br;
                    b.vpText('1 VP per 3 microbes on this card.');
                }),
            },
        });
    }
    onCardPlayed(player, card) {
        const qty = player.tags.cardTagCount(card, [Tag_1.Tag.ANIMAL, Tag_1.Tag.PLANT, Tag_1.Tag.MICROBE]);
        player.addResourceTo(this, { qty, log: true });
    }
    bespokePlay(player) {
        if (player.game.phase === Phase_1.Phase.PRELUDES && player.playedCards.length > 0 && player.playedCards[player.playedCards.length - 1].name === CardName_1.CardName.ECOLOGY_EXPERTS) {
            player.addResourceTo(this, { qty: 2, log: true });
        }
        return undefined;
    }
}
exports.Decomposers = Decomposers;
//# sourceMappingURL=Decomposers.js.map