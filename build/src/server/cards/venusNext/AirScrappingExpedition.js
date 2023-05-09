"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AirScrappingExpedition = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardResource_1 = require("../../../common/CardResource");
const SelectCard_1 = require("../../inputs/SelectCard");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
class AirScrappingExpedition extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.AIR_SCRAPPING_EXPEDITION,
            type: CardType_1.CardType.EVENT,
            tags: [Tag_1.Tag.VENUS],
            cost: 13,
            behavior: {
                global: { venus: 1 },
            },
            metadata: {
                cardNumber: '215',
                description: 'Raise Venus 1 step. Add 3 floaters to ANY Venus CARD.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.venus(1).floaters(3, { secondaryTag: Tag_1.Tag.VENUS });
                }),
            },
        });
    }
    bespokePlay(player) {
        let floaterCards = player.getResourceCards(CardResource_1.CardResource.FLOATER);
        floaterCards = floaterCards.filter((card) => card.tags.some((cardTag) => cardTag === Tag_1.Tag.VENUS));
        if (floaterCards.length === 0) {
            return undefined;
        }
        if (floaterCards.length === 1) {
            player.addResourceTo(floaterCards[0], { qty: 3, log: true });
            return;
        }
        return new SelectCard_1.SelectCard('Select card to add 3 floaters', 'Add floaters', floaterCards, ([card]) => {
            player.addResourceTo(card, { qty: 3, log: true });
            return undefined;
        });
    }
}
exports.AirScrappingExpedition = AirScrappingExpedition;
