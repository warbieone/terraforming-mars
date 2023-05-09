"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Atmoscoop = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const OrOptions_1 = require("../../inputs/OrOptions");
const SelectOption_1 = require("../../inputs/SelectOption");
const CardResource_1 = require("../../../common/CardResource");
const CardName_1 = require("../../../common/cards/CardName");
const constants = require("../../../common/constants");
const PartyHooks_1 = require("../../turmoil/parties/PartyHooks");
const PartyName_1 = require("../../../common/turmoil/PartyName");
const CardRequirements_1 = require("../CardRequirements");
const CardRenderer_1 = require("../render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
const Card_1 = require("../Card");
class Atmoscoop extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.ATMOSCOOP,
            cost: 22,
            tags: [Tag_1.Tag.JOVIAN, Tag_1.Tag.SPACE],
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.tag(Tag_1.Tag.SCIENCE, 3)),
            victoryPoints: 1,
            behavior: {
                addResourcesToAnyCard: { count: 2, type: CardResource_1.CardResource.FLOATER },
            },
            metadata: {
                cardNumber: '217',
                description: 'Requires 3 science tags. Either raise the temperature 2 steps, or raise Venus 2 steps. Add 2 floaters to ANY card.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.temperature(2).or(Size_1.Size.SMALL).venus(2).br;
                    b.floaters(2).asterix();
                }),
            },
        });
    }
    bespokeCanPlay(player) {
        const remainingTemperatureSteps = (constants.MAX_TEMPERATURE - player.game.getTemperature()) / 2;
        const remainingVenusSteps = (constants.MAX_VENUS_SCALE - player.game.getVenusScaleLevel()) / 2;
        const stepsRaised = Math.min(remainingTemperatureSteps, remainingVenusSteps, 2);
        if (PartyHooks_1.PartyHooks.shouldApplyPolicy(player, PartyName_1.PartyName.REDS)) {
            return player.canAfford(this.cost + constants.REDS_RULING_POLICY_COST * stepsRaised, { titanium: true });
        }
        return true;
    }
    bespokePlay(player) {
        const game = player.game;
        if (this.temperatureIsMaxed(game) && this.venusIsMaxed(game)) {
            return undefined;
        }
        const increaseTemp = new SelectOption_1.SelectOption('Raise temperature 2 steps', 'Raise temperature', () => {
            game.increaseTemperature(player, 2);
            return undefined;
        });
        const increaseVenus = new SelectOption_1.SelectOption('Raise Venus 2 steps', 'Raise Venus', () => {
            game.increaseVenusScaleLevel(player, 2);
            return undefined;
        });
        const increaseTempOrVenus = new OrOptions_1.OrOptions(increaseTemp, increaseVenus);
        increaseTempOrVenus.title = 'Choose global parameter to raise';
        if (!this.temperatureIsMaxed(game) && this.venusIsMaxed(game)) {
            player.game.increaseTemperature(player, 2);
        }
        else if (this.temperatureIsMaxed(game) && !this.venusIsMaxed(game)) {
            player.game.increaseVenusScaleLevel(player, 2);
        }
        else {
            return increaseTempOrVenus;
        }
        return undefined;
    }
    temperatureIsMaxed(game) {
        return game.getTemperature() === constants.MAX_TEMPERATURE;
    }
    venusIsMaxed(game) {
        return game.getVenusScaleLevel() === constants.MAX_VENUS_SCALE;
    }
}
exports.Atmoscoop = Atmoscoop;
