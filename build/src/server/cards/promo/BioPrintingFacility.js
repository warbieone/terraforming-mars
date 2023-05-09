"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BioPrintingFacility = void 0;
const Card_1 = require("../Card");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const CardResource_1 = require("../../../common/CardResource");
const Tag_1 = require("../../../common/cards/Tag");
const Resource_1 = require("../../../common/Resource");
const SelectCard_1 = require("../../inputs/SelectCard");
const OrOptions_1 = require("../../inputs/OrOptions");
const SelectOption_1 = require("../../inputs/SelectOption");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class BioPrintingFacility extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.BIO_PRINTING_FACILITY,
            tags: [Tag_1.Tag.BUILDING],
            cost: 7,
            metadata: {
                cardNumber: 'X36',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Spend 2 energy to gain 2 plants OR to add 1 animal to ANOTHER card.', (eb) => {
                        eb.energy(2, { digit: Options_1.digit }).startAction.plants(2);
                        eb.or().animals(1).asterix();
                    });
                }),
            },
        });
    }
    canAct(player) {
        return player.energy >= 2;
    }
    action(player) {
        const availableAnimalCards = player.getResourceCards(CardResource_1.CardResource.ANIMAL);
        player.deductResource(Resource_1.Resource.ENERGY, 2);
        if (availableAnimalCards.length === 0) {
            player.addResource(Resource_1.Resource.PLANTS, 2, { log: true });
            return undefined;
        }
        const gainPlantOption = new SelectOption_1.SelectOption('Gain 2 plants', 'Gain plants', () => {
            player.addResource(Resource_1.Resource.PLANTS, 2, { log: true });
            return undefined;
        });
        if (availableAnimalCards.length === 1) {
            const targetCard = availableAnimalCards[0];
            return new OrOptions_1.OrOptions(new SelectOption_1.SelectOption('Add 1 animal to ' + targetCard.name, 'Add animal', () => {
                player.addResourceTo(targetCard, { log: true });
                return undefined;
            }), gainPlantOption);
        }
        return new OrOptions_1.OrOptions(new SelectCard_1.SelectCard('Select card to add 1 animal', 'Add animal', availableAnimalCards, ([card]) => {
            player.addResourceTo(card, { log: true });
            return undefined;
        }), gainPlantOption);
    }
}
exports.BioPrintingFacility = BioPrintingFacility;
