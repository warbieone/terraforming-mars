"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalHeatTrapping = void 0;
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
class LocalHeatTrapping extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.EVENT,
            name: CardName_1.CardName.LOCAL_HEAT_TRAPPING,
            cost: 1,
            reserveUnits: { heat: 5 },
            metadata: {
                cardNumber: '190',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.minus().heat(5, { digit: Options_1.digit });
                    b.plus().plants(4, { digit: Options_1.digit });
                    b.or().animals(2, { digit: Options_1.digit }).asterix();
                }),
                description: 'Spend 5 heat to gain either 4 plants, or to add 2 animals to ANOTHER card.',
            },
        });
    }
    canPlay(player) {
        const cardCost = player.getCardCost(this);
        let heat = player.heat;
        let floaters = player.resourcesOnCard(CardName_1.CardName.STORMCRAFT_INCORPORATED);
        if (cardCost === 1 && player.megaCredits === 0) {
            if (heat > 0) {
                heat--;
            }
            else if (floaters > 0) {
                floaters--;
            }
            else {
                return false;
            }
        }
        const availableHeat = heat + (floaters * 2);
        return availableHeat >= 5;
    }
    play(player) {
        const availableActions = new OrOptions_1.OrOptions();
        const animalCards = player.getResourceCards(CardResource_1.CardResource.ANIMAL);
        const gainPlantsOption = new SelectOption_1.SelectOption('Gain 4 plants', 'Gain plants').andThen(() => {
            player.stock.add(Resource_1.Resource.PLANTS, 4, { log: true });
            return undefined;
        });
        if (animalCards.length === 0) {
            availableActions.options.push(gainPlantsOption);
        }
        else if (animalCards.length === 1) {
            const targetCard = animalCards[0];
            availableActions.options.push(gainPlantsOption, new SelectOption_1.SelectOption((0, MessageBuilder_1.message)('Add ${0} animals to ${1}', (b) => b.number(2).card(targetCard)), 'Add animals').andThen(() => {
                player.addResourceTo(targetCard, { qty: 2, log: true });
                return undefined;
            }));
        }
        else {
            availableActions.options.push(gainPlantsOption, new SelectCard_1.SelectCard('Select card to add 2 animals', 'Add animals', animalCards)
                .andThen(([card]) => {
                player.addResourceTo(card, { qty: 2, log: true });
                return undefined;
            }));
        }
        return player.spendHeat(5, () => {
            if (availableActions.options.length === 1)
                return availableActions.options[0].cb();
            return availableActions;
        });
    }
}
exports.LocalHeatTrapping = LocalHeatTrapping;
