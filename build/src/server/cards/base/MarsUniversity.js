"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarsUniversity = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const OrOptions_1 = require("../../inputs/OrOptions");
const SelectCard_1 = require("../../inputs/SelectCard");
const SelectOption_1 = require("../../inputs/SelectOption");
const CardName_1 = require("../../../common/cards/CardName");
const Priority_1 = require("../../deferredActions/Priority");
const CardRenderer_1 = require("../render/CardRenderer");
class MarsUniversity extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.MARS_UNIVERSITY,
            tags: [Tag_1.Tag.SCIENCE, Tag_1.Tag.BUILDING],
            cost: 12,
            metadata: {
                cardNumber: '073',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.effect('When you play a science tag, including this, you may discard a card from hand to draw a card.', (eb) => {
                        eb.tag(Tag_1.Tag.SCIENCE).startEffect.minus().cards(1).nbsp.plus().cards(1);
                    });
                }),
            },
        });
    }
    onCardPlayed(player, card) {
        const scienceTags = player.tags.cardTagCount(card, Tag_1.Tag.SCIENCE);
        this.onScienceTagAdded(player, scienceTags);
    }
    onColonyAddedToLeavitt(player) {
        this.onScienceTagAdded(player, 1);
    }
    onScienceTagAdded(player, count) {
        for (let i = 0; i < count; i++) {
            player.defer(() => {
                if (player.cardsInHand.length === 0) {
                    return undefined;
                }
                return new OrOptions_1.OrOptions(new SelectCard_1.SelectCard('Select a card to discard', 'Discard', player.cardsInHand)
                    .andThen(([card]) => {
                    player.game.log('${0} is using their ${1} effect to draw a card by discarding a card.', (b) => b.player(player).card(this));
                    player.discardCardFromHand(card, { log: true });
                    player.drawCard();
                    return undefined;
                }), new SelectOption_1.SelectOption('Do nothing'));
            }, Priority_1.Priority.DISCARD_AND_DRAW);
        }
        return undefined;
    }
}
exports.MarsUniversity = MarsUniversity;
