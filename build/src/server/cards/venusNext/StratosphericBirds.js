"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StratosphericBirds = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardResource_1 = require("../../../common/CardResource");
const CardName_1 = require("../../../common/cards/CardName");
const RemoveResourcesFromCard_1 = require("../../deferredActions/RemoveResourcesFromCard");
const CardRequirements_1 = require("../CardRequirements");
const CardRenderer_1 = require("../render/CardRenderer");
const ActionCard_1 = require("../ActionCard");
class StratosphericBirds extends ActionCard_1.ActionCard {
    constructor() {
        super({
            name: CardName_1.CardName.STRATOSPHERIC_BIRDS,
            type: CardType_1.CardType.ACTIVE,
            tags: [Tag_1.Tag.VENUS, Tag_1.Tag.ANIMAL],
            cost: 12,
            resourceType: CardResource_1.CardResource.ANIMAL,
            victoryPoints: { resourcesHere: {} },
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.venus(12)),
            action: {
                addResources: 1,
            },
            metadata: {
                cardNumber: '249',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Add 1 animal to this card.', (eb) => {
                        eb.empty().startAction.animals(1);
                    }).br;
                    b.minus().floaters(1).br;
                    b.vpText('1 VP for each animal on this card.');
                }),
                description: {
                    text: 'Requires Venus 12% and that you spend 1 floater from any card.',
                    align: 'left',
                },
            },
        });
    }
    bespokeCanPlay(player) {
        const cardsWithFloater = player.getCardsWithResources(CardResource_1.CardResource.FLOATER);
        if (cardsWithFloater.length === 0)
            return false;
        if (cardsWithFloater.length > 1) {
            return true;
        }
        else {
            const floaterCard = cardsWithFloater[0];
            if (floaterCard.name !== CardName_1.CardName.DIRIGIBLES)
                return true;
            const canPayForFloater = ((floaterCard.resourceCount - 1) * 3 + player.megaCredits) >= player.getCardCost(this);
            return canPayForFloater;
        }
    }
    bespokePlay(player) {
        player.game.defer(new RemoveResourcesFromCard_1.RemoveResourcesFromCard(player, CardResource_1.CardResource.FLOATER, 1, true));
        return undefined;
    }
}
exports.StratosphericBirds = StratosphericBirds;
