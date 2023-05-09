"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REDS_POLICY_4 = exports.REDS_POLICY_3 = exports.REDS_POLICY_2 = exports.REDS_POLICY_1 = exports.REDS_BONUS_2 = exports.REDS_BONUS_1 = exports.Reds = void 0;
const Party_1 = require("./Party");
const PartyName_1 = require("../../../common/turmoil/PartyName");
const SelectPaymentDeferred_1 = require("../../deferredActions/SelectPaymentDeferred");
const CardName_1 = require("../../../common/cards/CardName");
const constants_1 = require("../../../common/constants");
const DeferredAction_1 = require("../../deferredActions/DeferredAction");
const RemoveOceanTile_1 = require("../../deferredActions/RemoveOceanTile");
const OrOptions_1 = require("../../inputs/OrOptions");
const SelectOption_1 = require("../../inputs/SelectOption");
const MoonExpansion_1 = require("../../moon/MoonExpansion");
const GlobalParameter_1 = require("../../../common/GlobalParameter");
class Reds extends Party_1.Party {
    constructor() {
        super(...arguments);
        this.name = PartyName_1.PartyName.REDS;
        this.description = 'Wishes to preserve the red planet.';
        this.bonuses = [exports.REDS_BONUS_1, exports.REDS_BONUS_2];
        this.policies = [exports.REDS_POLICY_1, exports.REDS_POLICY_2, exports.REDS_POLICY_3, exports.REDS_POLICY_4];
    }
}
exports.Reds = Reds;
class RedsBonus01 {
    constructor() {
        this.id = 'rb01';
        this.description = 'The player(s) with the lowest TR gains 1 TR';
        this.isDefault = true;
    }
    getScore(player) {
        const game = player.game;
        const players = game.getPlayersInGenerationOrder();
        if (game.isSoloMode() && players[0].getTerraformRating() <= 20)
            return 1;
        players.sort((p1, p2) => p1.getTerraformRating() - p2.getTerraformRating());
        const min = players[0].getTerraformRating();
        if (player.getTerraformRating() === min)
            return 1;
        return 0;
    }
    grant(game) {
        const players = game.getPlayersInGenerationOrder();
        const scores = players.map((player) => this.getScore(player));
        players.forEach((player, idx) => {
            if (scores[idx] > 0)
                player.increaseTerraformRating();
        });
    }
}
class RedsBonus02 {
    constructor() {
        this.id = 'rb02';
        this.description = 'The player(s) with the highest TR loses 1 TR';
        this.isDefault = false;
    }
    getScore(player) {
        const game = player.game;
        const players = game.getPlayersInGenerationOrder();
        if (game.isSoloMode() && players[0].getTerraformRating() > 20)
            return -1;
        players.sort((p1, p2) => p2.getTerraformRating() - p1.getTerraformRating());
        const max = players[0].getTerraformRating();
        if (player.getTerraformRating() === max)
            return -1;
        return 0;
    }
    grant(game) {
        const players = game.getPlayersInGenerationOrder();
        const scores = players.map((player) => this.getScore(player));
        players.forEach((player, idx) => {
            if (scores[idx] < 0)
                player.decreaseTerraformRating();
        });
    }
}
class RedsPolicy01 {
    constructor() {
        this.id = 'rp01';
        this.isDefault = true;
        this.description = 'When you take an action that raises TR, you MUST pay 3 M€ per step raised';
    }
}
class RedsPolicy02 {
    constructor() {
        this.id = 'rp02';
        this.description = 'When you place a tile, pay 3 M€ or as much as possible';
        this.isDefault = false;
    }
    onTilePlaced(player) {
        let amountPlayerHas = player.megaCredits;
        if (player.isCorporation(CardName_1.CardName.HELION))
            amountPlayerHas += player.heat;
        const amountToPay = Math.min(amountPlayerHas, 3);
        if (amountToPay > 0) {
            player.game.defer(new SelectPaymentDeferred_1.SelectPaymentDeferred(player, amountToPay, { title: 'Select how to pay for tile placement' }));
        }
    }
}
class RedsPolicy03 {
    constructor() {
        this.id = 'rp03';
        this.description = 'Pay 4 M€ to reduce a non-maxed global parameter 1 step (do not gain any track bonuses)';
        this.isDefault = false;
    }
    canDecrease(game, parameter) {
        switch (parameter) {
            case GlobalParameter_1.GlobalParameter.TEMPERATURE:
                const temp = game.getTemperature();
                return temp > constants_1.MIN_TEMPERATURE && temp !== constants_1.MAX_TEMPERATURE;
            case GlobalParameter_1.GlobalParameter.OCEANS:
                return game.canRemoveOcean();
            case GlobalParameter_1.GlobalParameter.OXYGEN:
                const oxygenLevel = game.getOxygenLevel();
                return oxygenLevel > constants_1.MIN_OXYGEN_LEVEL && oxygenLevel !== constants_1.MAX_OXYGEN_LEVEL;
            case GlobalParameter_1.GlobalParameter.VENUS:
                const venusScaleLevel = game.getVenusScaleLevel();
                return game.gameOptions.venusNextExtension === true && venusScaleLevel > constants_1.MIN_VENUS_SCALE && venusScaleLevel !== constants_1.MAX_VENUS_SCALE;
            case GlobalParameter_1.GlobalParameter.MOON_HABITAT_RATE:
                return MoonExpansion_1.MoonExpansion.ifElseMoon(game, (moonData) => {
                    const rate = moonData.colonyRate;
                    return rate > 0 && rate !== constants_1.MAXIMUM_HABITAT_RATE;
                }, () => false);
            case GlobalParameter_1.GlobalParameter.MOON_LOGISTICS_RATE:
                return MoonExpansion_1.MoonExpansion.ifElseMoon(game, (moonData) => {
                    const rate = moonData.logisticRate;
                    return rate > 0 && rate !== constants_1.MAXIMUM_LOGISTICS_RATE;
                }, () => false);
            case GlobalParameter_1.GlobalParameter.MOON_MINING_RATE:
                return MoonExpansion_1.MoonExpansion.ifElseMoon(game, (moonData) => {
                    const rate = moonData.miningRate;
                    return rate > 0 && rate !== constants_1.MAXIMUM_MINING_RATE;
                }, () => false);
        }
    }
    canAct(player) {
        const game = player.game;
        if (game.marsIsTerraformed())
            return false;
        const temperature = game.getTemperature();
        const oceansPlaced = game.board.getOceanCount();
        const oxygenLevel = game.getOxygenLevel();
        const venusScaleLevel = game.getVenusScaleLevel();
        const basicParametersAtMinimum = temperature === constants_1.MIN_TEMPERATURE &&
            oceansPlaced === 0 &&
            oxygenLevel === constants_1.MIN_OXYGEN_LEVEL &&
            venusScaleLevel === constants_1.MIN_VENUS_SCALE;
        const moonParametersAtMinimum = MoonExpansion_1.MoonExpansion.ifElseMoon(game, (moonData) => moonData.colonyRate === 0 && moonData.logisticRate === 0 && moonData.miningRate === 0, () => false);
        if (basicParametersAtMinimum && moonParametersAtMinimum) {
            return false;
        }
        return player.canAfford(4) && player.politicalAgendasActionUsedCount < constants_1.POLITICAL_AGENDAS_MAX_ACTION_USES;
    }
    action(player) {
        const game = player.game;
        game.log('${0} used Turmoil Reds action', (b) => b.player(player));
        player.politicalAgendasActionUsedCount += 1;
        game.defer(new SelectPaymentDeferred_1.SelectPaymentDeferred(player, 4, {
            title: 'Select how to pay for Turmoil Reds action',
            afterPay: () => {
                const orOptions = new OrOptions_1.OrOptions();
                if (this.canDecrease(game, GlobalParameter_1.GlobalParameter.TEMPERATURE)) {
                    orOptions.options.push(new SelectOption_1.SelectOption('Decrease temperature', 'Confirm', () => {
                        game.increaseTemperature(player, -1);
                        game.log('${0} decreased temperature 1 step', (b) => b.player(player));
                        return undefined;
                    }));
                }
                if (this.canDecrease(game, GlobalParameter_1.GlobalParameter.OCEANS)) {
                    orOptions.options.push(new SelectOption_1.SelectOption('Remove an ocean tile', 'Confirm', () => {
                        game.defer(new RemoveOceanTile_1.RemoveOceanTile(player, 'Turmoil Reds action - Remove an Ocean tile from the board'));
                        return undefined;
                    }));
                }
                if (this.canDecrease(game, GlobalParameter_1.GlobalParameter.OXYGEN)) {
                    orOptions.options.push(new SelectOption_1.SelectOption('Decrease oxygen level', 'Confirm', () => {
                        game.increaseOxygenLevel(player, -1);
                        game.log('${0} decreased oxygen level 1 step', (b) => b.player(player));
                        return undefined;
                    }));
                }
                if (this.canDecrease(game, GlobalParameter_1.GlobalParameter.VENUS)) {
                    orOptions.options.push(new SelectOption_1.SelectOption('Decrease Venus scale', 'Confirm', () => {
                        game.increaseVenusScaleLevel(player, -1);
                        game.log('${0} decreased Venus scale level 1 step', (b) => b.player(player));
                        return undefined;
                    }));
                }
                if (this.canDecrease(game, GlobalParameter_1.GlobalParameter.MOON_HABITAT_RATE)) {
                    orOptions.options.push(new SelectOption_1.SelectOption('Decrease Moon habitat rate', 'Confirm', () => {
                        MoonExpansion_1.MoonExpansion.lowerHabitatRate(player, 1);
                        return undefined;
                    }));
                }
                if (this.canDecrease(game, GlobalParameter_1.GlobalParameter.MOON_MINING_RATE)) {
                    orOptions.options.push(new SelectOption_1.SelectOption('Decrease Moon mining rate', 'Confirm', () => {
                        MoonExpansion_1.MoonExpansion.lowerMiningRate(player, 1);
                        return undefined;
                    }));
                }
                if (this.canDecrease(game, GlobalParameter_1.GlobalParameter.MOON_LOGISTICS_RATE)) {
                    orOptions.options.push(new SelectOption_1.SelectOption('Decrease Moon Logistics Rate', 'Confirm', () => {
                        MoonExpansion_1.MoonExpansion.lowerLogisticRate(player, 1);
                        return undefined;
                    }));
                }
                if (orOptions.options.length === 1)
                    return orOptions.options[0].cb();
                game.defer(new DeferredAction_1.SimpleDeferredAction(player, () => orOptions));
                return undefined;
            },
        }));
        return undefined;
    }
}
class RedsPolicy04 {
    constructor() {
        this.id = 'rp04';
        this.description = 'When you raise a global parameter, decrease your M€ production 1 step per step raised if possible';
        this.isDefault = false;
    }
}
exports.REDS_BONUS_1 = new RedsBonus01();
exports.REDS_BONUS_2 = new RedsBonus02();
exports.REDS_POLICY_1 = new RedsPolicy01();
exports.REDS_POLICY_2 = new RedsPolicy02();
exports.REDS_POLICY_3 = new RedsPolicy03();
exports.REDS_POLICY_4 = new RedsPolicy04();
