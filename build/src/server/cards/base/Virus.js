"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Virus = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const OrOptions_1 = require("../../inputs/OrOptions");
const CardName_1 = require("../../../common/cards/CardName");
const SelectOption_1 = require("../../inputs/SelectOption");
const CardResource_1 = require("../../../common/CardResource");
const RemoveAnyPlants_1 = require("../../deferredActions/RemoveAnyPlants");
const RemoveResourcesFromCard_1 = require("../../deferredActions/RemoveResourcesFromCard");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class Virus extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.EVENT,
            name: CardName_1.CardName.VIRUS,
            tags: [Tag_1.Tag.MICROBE],
            cost: 1,
            metadata: {
                cardNumber: '050',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.minus().animals(2, { all: Options_1.all, digit: Options_1.digit }).nbsp;
                    b.or().nbsp.minus().plants(5, { all: Options_1.all, digit: Options_1.digit });
                }),
                description: 'Remove up to 2 animals or 5 plants from any player.',
            },
        });
    }
    bespokePlay(player) {
        if (player.game.isSoloMode()) {
            player.game.someoneHasRemovedOtherPlayersPlants = true;
            return undefined;
        }
        const orOptionsAnimals = new RemoveResourcesFromCard_1.RemoveResourcesFromCard(player, CardResource_1.CardResource.ANIMAL, 2, false, false).execute();
        const removeAnimals = orOptionsAnimals !== undefined ?
            orOptionsAnimals.options[0] :
            undefined;
        const orOptionsPlants = new RemoveAnyPlants_1.RemoveAnyPlants(player, 5).execute();
        const removePlants = orOptionsPlants !== undefined ?
            orOptionsPlants.options.slice(0, -1) :
            undefined;
        if (removeAnimals === undefined && removePlants === undefined) {
            player.game.log('There was nobody to steal plants or animals from.');
            return undefined;
        }
        const orOptions = new OrOptions_1.OrOptions();
        if (removeAnimals !== undefined) {
            orOptions.options.push(removeAnimals);
        }
        if (removePlants !== undefined) {
            orOptions.options.push(...removePlants);
        }
        orOptions.options.push(new SelectOption_1.SelectOption('Skip removal', 'Confirm', () => {
            return undefined;
        }));
        return orOptions;
    }
}
exports.Virus = Virus;
