"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CEOsFavoriteProject = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const SelectCard_1 = require("../../inputs/SelectCard");
const CardName_1 = require("../../../common/cards/CardName");
const LogHelper_1 = require("../../LogHelper");
const CardRenderer_1 = require("../render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
class CEOsFavoriteProject extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.EVENT,
            name: CardName_1.CardName.CEOS_FAVORITE_PROJECT,
            cost: 1,
            metadata: {
                cardNumber: '149',
                renderData: CardRenderer_1.CardRenderer.builder((b) => b.text('Add 1 resource to a card with at least 1 resource on it', Size_1.Size.SMALL, true)),
            },
        });
    }
    bespokeCanPlay(player) {
        return player.getCardsWithResources().length > 0 ||
            player.getSelfReplicatingRobotsTargetCards().length > 0;
    }
    bespokePlay(player) {
        const cards = player.getCardsWithResources();
        const robotCards = player.getSelfReplicatingRobotsTargetCards();
        return new SelectCard_1.SelectCard('Select card to add resource', 'Add resource', cards.concat(robotCards.map((c) => c.card)), ([card]) => {
            const robotCard = robotCards.find((c) => c.card.name === card.name);
            if (robotCard) {
                robotCard.resourceCount++;
                LogHelper_1.LogHelper.logAddResource(player, robotCard.card);
            }
            else {
                if (!cards.includes(card)) {
                    throw new Error('Invalid card selection');
                }
                player.addResourceTo(card, { log: true });
            }
            return undefined;
        });
    }
}
exports.CEOsFavoriteProject = CEOsFavoriteProject;
