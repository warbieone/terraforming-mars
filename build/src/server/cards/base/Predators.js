"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Predators = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardResource_1 = require("../../../common/CardResource");
const CardName_1 = require("../../../common/cards/CardName");
const AddResourcesToCard_1 = require("../../deferredActions/AddResourcesToCard");
const RemoveResourcesFromCard_1 = require("../../deferredActions/RemoveResourcesFromCard");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class Predators extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.PREDATORS,
            tags: [Tag_1.Tag.ANIMAL],
            cost: 14,
            resourceType: CardResource_1.CardResource.ANIMAL,
            victoryPoints: { resourcesHere: {} },
            requirements: { oxygen: 11 },
            metadata: {
                cardNumber: '024',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Remove 1 animal from any card and add it to this card.', (eb) => {
                        eb.resource(CardResource_1.CardResource.ANIMAL, { all: Options_1.all }).startAction.resource(CardResource_1.CardResource.ANIMAL);
                    }).br;
                    b.vpText('1 VP per animal on this card.');
                }),
                description: 'Requires 11% oxygen.',
            },
        });
    }
    canAct(player) {
        if (player.game.isSoloMode())
            return true;
        return RemoveResourcesFromCard_1.RemoveResourcesFromCard.getAvailableTargetCards(player, CardResource_1.CardResource.ANIMAL).length > 0;
    }
    action(player) {
        player.game.defer(new RemoveResourcesFromCard_1.RemoveResourcesFromCard(player, CardResource_1.CardResource.ANIMAL)
            .andThen((response) => {
            if (response.proceed) {
                player.game.defer(new AddResourcesToCard_1.AddResourcesToCard(player, CardResource_1.CardResource.ANIMAL, { filter: (c) => c.name === this.name }));
            }
        }));
        return undefined;
    }
}
exports.Predators = Predators;
