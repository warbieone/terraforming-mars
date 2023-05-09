"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LargeConvoy = void 0;
const Card_1 = require("../Card");
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const OrOptions_1 = require("../../inputs/OrOptions");
const SelectCard_1 = require("../../inputs/SelectCard");
const SelectOption_1 = require("../../inputs/SelectOption");
const CardResource_1 = require("../../../common/CardResource");
const CardName_1 = require("../../../common/cards/CardName");
const Resource_1 = require("../../../common/Resource");
const CardRenderer_1 = require("../render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
const Options_1 = require("../Options");
class LargeConvoy extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.EVENT,
            name: CardName_1.CardName.LARGE_CONVOY,
            tags: [Tag_1.Tag.EARTH, Tag_1.Tag.SPACE],
            cost: 36,
            victoryPoints: 2,
            behavior: {
                drawCard: 2,
                ocean: {},
            },
            metadata: {
                cardNumber: '143',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.oceans(1).cards(2).br;
                    b.plants(5, { digit: Options_1.digit }).or(Size_1.Size.MEDIUM).animals(4, { digit: Options_1.digit }).asterix();
                }),
                description: 'Place an ocean tile and draw 2 cards. Gain 5 plants or add 4 animals to ANOTHER card.',
            },
        });
    }
    bespokePlay(player) {
        const animalCards = player.getResourceCards(CardResource_1.CardResource.ANIMAL);
        const gainPlants = function () {
            player.addResource(Resource_1.Resource.PLANTS, 5, { log: true });
            return undefined;
        };
        if (animalCards.length === 0)
            return gainPlants();
        const availableActions = [];
        const gainPlantsOption = new SelectOption_1.SelectOption('Gain 5 plants', 'Gain plants', gainPlants);
        availableActions.push(gainPlantsOption);
        if (animalCards.length === 1) {
            const targetAnimalCard = animalCards[0];
            availableActions.push(new SelectOption_1.SelectOption('Add 4 animals to ' + targetAnimalCard.name, 'Add animals', () => {
                player.addResourceTo(targetAnimalCard, { qty: 4, log: true });
                return undefined;
            }));
        }
        else {
            availableActions.push(new SelectCard_1.SelectCard('Select card to add 4 animals', 'Add animals', animalCards, ([card]) => {
                player.addResourceTo(card, { qty: 4, log: true });
                return undefined;
            }));
        }
        return new OrOptions_1.OrOptions(...availableActions);
    }
}
exports.LargeConvoy = LargeConvoy;
