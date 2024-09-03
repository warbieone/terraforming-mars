"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommunicationCenter = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Tag_1 = require("../../../common/cards/Tag");
const CardResource_1 = require("../../../common/CardResource");
const Options_1 = require("../Options");
const Size_1 = require("../../../common/cards/render/Size");
const Priority_1 = require("../../deferredActions/Priority");
class CommunicationCenter extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.COMMUNICATION_CENTER,
            cost: 8,
            tags: [Tag_1.Tag.SCIENCE, Tag_1.Tag.MARS, Tag_1.Tag.BUILDING],
            resourceType: CardResource_1.CardResource.DATA,
            behavior: {
                production: { energy: -1 },
                addResources: 2,
            },
            metadata: {
                cardNumber: 'Pf28',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.tag(Tag_1.Tag.EVENT, { all: Options_1.all }).colon().resource(CardResource_1.CardResource.DATA).nbsp.resource(CardResource_1.CardResource.DATA, { amount: 3, digit: Options_1.digit }).colon().cards(1).br;
                    b.text('(Effect: Whenever ANY PLAYER plays an event, add 1 data to this card.)', Size_1.Size.TINY, false, false).br;
                    b.text('(Effect: Remove 3 data to draw a card automatically.)', Size_1.Size.TINY, false, false).br;
                    b.minus().production((pb) => pb.energy(1)).resource(CardResource_1.CardResource.DATA, 2);
                }),
                description: 'Decrease your energy production 1 step. Place 2 data on this card.',
            },
        });
    }
    onResourceAdded(player, playedCard) {
        if (playedCard.name !== this.name)
            return;
        while (this.resourceCount >= 3) {
            this.resourceCount -= 3;
            player.drawCard(1);
            player.game.log('${0} automatically removed 3 data from ${1} to draw a card.', (b) => {
                b.player(player).card(this);
            });
        }
    }
    onCardPlayedFromAnyPlayer(thisCardOwner, _playedCardOwner, card) {
        if (card.type === CardType_1.CardType.EVENT) {
            const priority = (card.name === CardName_1.CardName.CEOS_FAVORITE_PROJECT) ? Priority_1.Priority.BACK_OF_THE_LINE : Priority_1.Priority.DEFAULT;
            thisCardOwner.defer(() => {
                thisCardOwner.addResourceTo(this, { qty: 1, log: true });
            }, priority);
        }
        return undefined;
    }
}
exports.CommunicationCenter = CommunicationCenter;
