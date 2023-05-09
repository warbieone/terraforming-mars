"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectInspection = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const ICard_1 = require("../ICard");
const SelectCard_1 = require("../../inputs/SelectCard");
const CardRenderer_1 = require("../render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
class ProjectInspection extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.EVENT,
            name: CardName_1.CardName.PROJECT_INSPECTION,
            cost: 0,
            metadata: {
                cardNumber: 'X02',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.text('Use a card action that has been used this generation.', Size_1.Size.SMALL, true);
                }),
            },
        });
    }
    getActionCards(player) {
        const result = [];
        for (const playedCard of player.tableau) {
            if (playedCard === this) {
                continue;
            }
            if (!(0, ICard_1.isIActionCard)(playedCard)) {
                continue;
            }
            if ((0, ICard_1.isIHasCheckLoops)(playedCard) && playedCard.getCheckLoops() >= 2) {
                continue;
            }
            if (player.getActionsThisGeneration().has(playedCard.name) && playedCard.canAct(player)) {
                result.push(playedCard);
            }
        }
        return result;
    }
    bespokeCanPlay(player) {
        return this.getActionCards(player).length > 0;
    }
    bespokePlay(player) {
        const actionCards = this.getActionCards(player);
        if (actionCards.length === 0) {
            return undefined;
        }
        return new SelectCard_1.SelectCard('Perform an action from a played card again', 'Take action', actionCards, ([card]) => {
            const foundCard = card;
            player.game.log('${0} used ${1} action with ${2}', (b) => b.player(player).card(foundCard).card(this));
            return foundCard.action(player);
        });
    }
}
exports.ProjectInspection = ProjectInspection;
