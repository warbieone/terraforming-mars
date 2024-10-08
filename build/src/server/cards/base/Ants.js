"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ants = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardResource_1 = require("../../../common/CardResource");
const CardName_1 = require("../../../common/cards/CardName");
const AddResourcesToCard_1 = require("../../deferredActions/AddResourcesToCard");
const RemoveResourcesFromCard_1 = require("../../deferredActions/RemoveResourcesFromCard");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class Ants extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.ANTS,
            tags: [Tag_1.Tag.MICROBE],
            cost: 9,
            resourceType: CardResource_1.CardResource.MICROBE,
            victoryPoints: { resourcesHere: {}, per: 2 },
            requirements: { oxygen: 4 },
            metadata: {
                cardNumber: '035',
                description: 'Requires 4% oxygen.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Remove 1 microbe from any card to add 1 to this card.', (eb) => {
                        eb.resource(CardResource_1.CardResource.MICROBE, { all: Options_1.all }).startAction.resource(CardResource_1.CardResource.MICROBE);
                    }).br;
                    b.vpText('1 VP per 2 microbes on this card.');
                }),
            },
        });
    }
    canAct(player) {
        if (player.game.isSoloMode())
            return true;
        return RemoveResourcesFromCard_1.RemoveResourcesFromCard.getAvailableTargetCards(player, CardResource_1.CardResource.MICROBE).length > 0;
    }
    action(player) {
        player.game.defer(new RemoveResourcesFromCard_1.RemoveResourcesFromCard(player, CardResource_1.CardResource.MICROBE).andThen((response) => {
            if (response.proceed) {
                player.game.defer(new AddResourcesToCard_1.AddResourcesToCard(player, CardResource_1.CardResource.MICROBE, { filter: (c) => c.name === this.name }));
            }
        }));
        return undefined;
    }
}
exports.Ants = Ants;
