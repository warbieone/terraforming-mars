"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtremeColdFungus = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const OrOptions_1 = require("../../inputs/OrOptions");
const SelectOption_1 = require("../../inputs/SelectOption");
const SelectCard_1 = require("../../inputs/SelectCard");
const CardResource_1 = require("../../../common/CardResource");
const CardName_1 = require("../../../common/cards/CardName");
const Resource_1 = require("../../../common/Resource");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
const MessageBuilder_1 = require("../../logs/MessageBuilder");
class ExtremeColdFungus extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.EXTREME_COLD_FUNGUS,
            tags: [Tag_1.Tag.MICROBE],
            cost: 13,
            requirements: { temperature: -10, max: Options_1.max },
            metadata: {
                cardNumber: '134',
                description: 'It must be -10 C or colder.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Gain 1 plant.', (eb) => {
                        eb.empty().startAction.plants(1);
                    }).br;
                    b.or().br;
                    b.action('Add 2 microbes to ANOTHER card.', (eb) => {
                        eb.empty().startAction.microbes(2).asterix();
                    });
                }),
            },
        });
    }
    canAct() {
        return true;
    }
    action(player) {
        const otherMicrobeCards = player.getResourceCards(CardResource_1.CardResource.MICROBE);
        if (otherMicrobeCards.length === 0) {
            player.stock.add(Resource_1.Resource.PLANTS, 1, { log: true });
            return undefined;
        }
        const gainPlantOption = new SelectOption_1.SelectOption('Gain 1 plant', 'Gain plant').andThen(() => {
            player.stock.add(Resource_1.Resource.PLANTS, 1, { log: true });
            return undefined;
        });
        if (otherMicrobeCards.length === 1) {
            const targetCard = otherMicrobeCards[0];
            return new OrOptions_1.OrOptions(new SelectOption_1.SelectOption((0, MessageBuilder_1.message)('Add ${0} microbes to ${1}', (b) => b.number(2).card(targetCard)), 'Add microbes').andThen(() => {
                player.addResourceTo(targetCard, { qty: 2, log: true });
                return undefined;
            }), gainPlantOption);
        }
        return new OrOptions_1.OrOptions(new SelectCard_1.SelectCard('Select card to add 2 microbes', 'Add microbes', otherMicrobeCards)
            .andThen(([card]) => {
            player.addResourceTo(card, { qty: 2, log: true });
            return undefined;
        }), gainPlantOption);
    }
}
exports.ExtremeColdFungus = ExtremeColdFungus;
