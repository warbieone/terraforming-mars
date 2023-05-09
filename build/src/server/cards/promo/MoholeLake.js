"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoholeLake = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardResource_1 = require("../../../common/CardResource");
const SelectCard_1 = require("../../inputs/SelectCard");
const CardRenderer_1 = require("../render/CardRenderer");
class MoholeLake extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.MOHOLE_LAKE,
            tags: [Tag_1.Tag.BUILDING],
            cost: 31,
            behavior: {
                stock: { plants: 3 },
                global: { temperature: 1 },
                ocean: {},
            },
            metadata: {
                cardNumber: 'X27',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Add a microbe or animal to ANOTHER card.', (eb) => {
                        eb.empty().startAction.microbes(1).asterix();
                        eb.nbsp.or().nbsp.animals(1).asterix();
                    }).br;
                    b.plants(3).temperature(1).oceans(1);
                }),
                description: 'Gain 3 plants. Raise temperature 1 step, and place 1 ocean tile.',
            },
        });
    }
    canAct() {
        return true;
    }
    action(player) {
        const availableCards = player.getResourceCards(CardResource_1.CardResource.MICROBE).concat(player.getResourceCards(CardResource_1.CardResource.ANIMAL));
        if (availableCards.length === 0) {
            return undefined;
        }
        if (availableCards.length === 1) {
            player.addResourceTo(availableCards[0], { log: true });
            return undefined;
        }
        return new SelectCard_1.SelectCard('Select card to add microbe or animal', 'Add resource', availableCards, ([card]) => {
            player.addResourceTo(card, { log: true });
            return undefined;
        });
    }
}
exports.MoholeLake = MoholeLake;
