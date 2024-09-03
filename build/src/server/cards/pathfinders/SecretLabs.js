"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecretLabs = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Tag_1 = require("../../../common/cards/Tag");
const OrOptions_1 = require("../../inputs/OrOptions");
const SelectOption_1 = require("../../inputs/SelectOption");
const PlaceOceanTile_1 = require("../../deferredActions/PlaceOceanTile");
const AddResourcesToCard_1 = require("../../deferredActions/AddResourcesToCard");
const Resource_1 = require("../../../common/Resource");
const CardResource_1 = require("../../../common/CardResource");
const Options_1 = require("../Options");
const constants_1 = require("../../../common/constants");
class SecretLabs extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.SECRET_LABS,
            cost: 21,
            tags: [Tag_1.Tag.JOVIAN, Tag_1.Tag.BUILDING, Tag_1.Tag.SPACE],
            requirements: [{ tag: Tag_1.Tag.SCIENCE }, { tag: Tag_1.Tag.JOVIAN }],
            victoryPoints: 1,
            metadata: {
                cardNumber: 'Pf26',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.oceans(1).resource(CardResource_1.CardResource.MICROBE, { amount: 2, digit: Options_1.digit }).asterix().or().temperature(1).br;
                    b.plants(3, { digit: Options_1.digit }).or().oxygen(1).resource(CardResource_1.CardResource.FLOATER, { amount: 2, digit: Options_1.digit }).asterix().br;
                }),
                description: 'Requires 1 science tag and 1 Jovian tag. ' +
                    'Place an ocean tile. Add 2 microbes to ANY card. ' +
                    'OR Raise temperature 1 step. Gain 3 plants. ' +
                    'OR Raise oxygen level 1 step. Add 2 floaters to ANY card.',
            },
        });
    }
    adjustedOptions(options, trSource, cost) {
        const newOptions = { ...options };
        newOptions.tr = trSource;
        if (cost !== undefined) {
            newOptions.cost = cost;
        }
        return newOptions;
    }
    bespokeCanPlay(player, canAffordOptions) {
        return (player.canAfford(this.adjustedOptions(canAffordOptions, { oceans: 1 })) ||
            player.canAfford(this.adjustedOptions(canAffordOptions, { temperature: 1 })) ||
            player.canAfford(this.adjustedOptions(canAffordOptions, { oxygen: 1 })));
    }
    bespokePlay(player) {
        const options = new OrOptions_1.OrOptions();
        if (player.canAfford({ cost: 0, tr: { oceans: 1 } })) {
            const oceanPlacementAvailable = player.game.board.getOceanSpaces().length < constants_1.MAX_OCEAN_TILES;
            const optionTitle = oceanPlacementAvailable ? 'Place an ocean tile. Add 2 microbes to ANY card.' : 'Add 2 microbes to ANY card.';
            options.options.push(new SelectOption_1.SelectOption(optionTitle).andThen(() => {
                if (oceanPlacementAvailable || player.cardIsInEffect(CardName_1.CardName.WHALES)) {
                    player.game.defer(new PlaceOceanTile_1.PlaceOceanTile(player));
                }
                player.game.defer(new AddResourcesToCard_1.AddResourcesToCard(player, CardResource_1.CardResource.MICROBE, { count: 2 }));
                return undefined;
            }));
        }
        if (player.canAfford({ cost: 0, tr: { temperature: 1 } })) {
            options.options.push(new SelectOption_1.SelectOption('Raise temperature 1 step. Gain 3 plants.').andThen(() => {
                player.game.increaseTemperature(player, 1);
                player.stock.add(Resource_1.Resource.PLANTS, 3, { log: true });
                return undefined;
            }));
        }
        if (player.canAfford({ cost: 0, tr: { oxygen: 1 } })) {
            options.options.push(new SelectOption_1.SelectOption('Raise oxygen level 1 step. Add 2 floaters to ANY card.').andThen(() => {
                player.game.increaseOxygenLevel(player, 1);
                player.game.defer(new AddResourcesToCard_1.AddResourcesToCard(player, CardResource_1.CardResource.FLOATER, { count: 2 }));
                return undefined;
            }));
        }
        return options;
    }
}
exports.SecretLabs = SecretLabs;
