"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportedHydrogen = void 0;
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
class ImportedHydrogen extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.EVENT,
            name: CardName_1.CardName.IMPORTED_HYDROGEN,
            tags: [Tag_1.Tag.EARTH, Tag_1.Tag.SPACE],
            cost: 16,
            behavior: {
                ocean: {},
            },
            metadata: {
                cardNumber: '019',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.plants(3, { digit: Options_1.digit });
                    b.or();
                    b.resource(CardResource_1.CardResource.MICROBE, { amount: 3, digit: Options_1.digit }).asterix().or();
                    b.resource(CardResource_1.CardResource.ANIMAL, { amount: 2, digit: Options_1.digit }).asterix().br;
                    b.oceans(1);
                }),
                description: 'Gain 3 plants, or add 3 microbes or 2 animals to ANOTHER card. Place an ocean tile.',
            },
        });
    }
    bespokePlay(player) {
        const availableMicrobeCards = player.getResourceCards(CardResource_1.CardResource.MICROBE);
        const availableAnimalCards = player.getResourceCards(CardResource_1.CardResource.ANIMAL);
        const gainPlants = function () {
            player.stock.add(Resource_1.Resource.PLANTS, 3, { log: true });
            return undefined;
        };
        if (availableMicrobeCards.length === 0 && availableAnimalCards.length === 0) {
            return gainPlants();
        }
        const availableActions = [];
        const gainPlantsOption = new SelectOption_1.SelectOption('Gain 3 plants', 'Gain plants').andThen(gainPlants);
        availableActions.push(gainPlantsOption);
        if (availableMicrobeCards.length === 1) {
            const targetMicrobeCard = availableMicrobeCards[0];
            availableActions.push(new SelectOption_1.SelectOption((0, MessageBuilder_1.message)('Add ${0} microbes to ${1}', (b) => b.number(3).card(targetMicrobeCard)), 'Add microbes').andThen(() => {
                player.addResourceTo(targetMicrobeCard, { qty: 3, log: true });
                return undefined;
            }));
        }
        else if (availableMicrobeCards.length > 1) {
            availableActions.push(new SelectCard_1.SelectCard('Add 3 microbes to a card', 'Add microbes', availableMicrobeCards)
                .andThen(([card]) => {
                player.addResourceTo(card, { qty: 3, log: true });
                return undefined;
            }));
        }
        if (availableAnimalCards.length === 1) {
            const targetAnimalCard = availableAnimalCards[0];
            availableActions.push(new SelectOption_1.SelectOption((0, MessageBuilder_1.message)('Add ${0} animals to ${1}', (b) => b.number(2).card(targetAnimalCard)), 'Add animals').andThen(() => {
                player.addResourceTo(targetAnimalCard, { qty: 2, log: true });
                return undefined;
            }));
        }
        else if (availableAnimalCards.length > 1) {
            availableActions.push(new SelectCard_1.SelectCard('Add 2 animals to a card', 'Add animals', availableAnimalCards)
                .andThen(([card]) => {
                player.addResourceTo(card, { qty: 2, log: true });
                return undefined;
            }));
        }
        return new OrOptions_1.OrOptions(...availableActions);
    }
}
exports.ImportedHydrogen = ImportedHydrogen;
