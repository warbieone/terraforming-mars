"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FloaterUrbanism = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const CardResource_1 = require("../../../common/CardResource");
const Tag_1 = require("../../../common/cards/Tag");
const SelectCard_1 = require("../../inputs/SelectCard");
class FloaterUrbanism extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.FLOATER_URBANISM,
            cost: 7,
            tags: [Tag_1.Tag.VENUS],
            resourceType: CardResource_1.CardResource.VENUSIAN_HABITAT,
            requirements: { tag: Tag_1.Tag.VENUS, count: 4 },
            victoryPoints: { resourcesHere: {} },
            metadata: {
                cardNumber: 'Pf59',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Spend 1 floater from any card to add 1 Venusian habitat on this card.', (ab) => {
                        ab.minus().resource(CardResource_1.CardResource.FLOATER).startAction.resource(CardResource_1.CardResource.VENUSIAN_HABITAT);
                    }).br;
                    b.vpText('1 VP for every Venusian habitat on this card.');
                }),
                description: 'Requires 4 Venus tags.',
            },
        });
    }
    canAct(player) {
        return player.getResourceCount(CardResource_1.CardResource.FLOATER) > 0;
    }
    action(player) {
        const cards = player.getCardsWithResources(CardResource_1.CardResource.FLOATER);
        const input = new SelectCard_1.SelectCard('Choose a card to move a floater to a Venusian habitat.', 'Choose', cards)
            .andThen(([card]) => {
            player.removeResourceFrom(card, 1);
            player.addResourceTo(this, { log: true });
            return undefined;
        });
        if (cards.length === 0) {
            return undefined;
        }
        if (cards.length === 1) {
            input.cb(cards);
            return undefined;
        }
        return input;
    }
}
exports.FloaterUrbanism = FloaterUrbanism;
