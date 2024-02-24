"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TurmoilHandler = void 0;
const constants = require("../../common/constants");
const GlobalParameter_1 = require("../../common/GlobalParameter");
const SelectOption_1 = require("../inputs/SelectOption");
const Resource_1 = require("../../common/Resource");
const Greens_1 = require("./parties/Greens");
const Kelvinists_1 = require("./parties/Kelvinists");
const MarsFirst_1 = require("./parties/MarsFirst");
const PartyHooks_1 = require("./parties/PartyHooks");
const PartyName_1 = require("../../common/turmoil/PartyName");
const Reds_1 = require("./parties/Reds");
const MoonExpansion_1 = require("../moon/MoonExpansion");
const Policy_1 = require("./Policy");
class TurmoilHandler {
    constructor() { }
    static partyAction(player) {
        const turmoil = player.game.turmoil;
        if (turmoil === undefined) {
            return undefined;
        }
        const policy = turmoil.rulingPolicy();
        if (policy.canAct?.(player)) {
            return new SelectOption_1.SelectOption((0, Policy_1.policyDescription)(policy, player), 'Pay').andThen(() => policy.action?.(player));
        }
        return undefined;
    }
    static applyOnCardPlayedEffect(player, selectedCard) {
        if (PartyHooks_1.PartyHooks.shouldApplyPolicy(player, PartyName_1.PartyName.GREENS, 'gp03')) {
            Greens_1.GREENS_POLICY_3.onCardPlayed(player, selectedCard);
        }
        if (PartyHooks_1.PartyHooks.shouldApplyPolicy(player, PartyName_1.PartyName.MARS, 'mfp02')) {
            MarsFirst_1.MARS_FIRST_POLICY_2.onCardPlayed(player, selectedCard);
        }
    }
    static resolveTilePlacementCosts(player) {
        if (PartyHooks_1.PartyHooks.shouldApplyPolicy(player, PartyName_1.PartyName.REDS, 'rp02')) {
            Reds_1.REDS_POLICY_2.onTilePlaced(player);
        }
    }
    static resolveTilePlacementBonuses(player, spaceType) {
        PartyHooks_1.PartyHooks.applyMarsFirstRulingPolicy(player, spaceType);
        if (PartyHooks_1.PartyHooks.shouldApplyPolicy(player, PartyName_1.PartyName.GREENS, 'gp02')) {
            Greens_1.GREENS_POLICY_2.onTilePlaced(player);
        }
        if (PartyHooks_1.PartyHooks.shouldApplyPolicy(player, PartyName_1.PartyName.KELVINISTS, 'kp04')) {
            Kelvinists_1.KELVINISTS_POLICY_4.onTilePlaced(player);
        }
    }
    static onGlobalParameterIncrease(player, parameter, steps = 1) {
        if (parameter === GlobalParameter_1.GlobalParameter.TEMPERATURE) {
            if (PartyHooks_1.PartyHooks.shouldApplyPolicy(player, PartyName_1.PartyName.KELVINISTS, 'kp02')) {
                player.stock.add(Resource_1.Resource.MEGACREDITS, steps * 3);
            }
        }
        if (PartyHooks_1.PartyHooks.shouldApplyPolicy(player, PartyName_1.PartyName.REDS, 'rp04')) {
            player.production.add(Resource_1.Resource.MEGACREDITS, -1 * steps, { log: true });
        }
        if (PartyHooks_1.PartyHooks.shouldApplyPolicy(player, PartyName_1.PartyName.SCIENTISTS, 'sp03')) {
            player.drawCard(steps);
        }
    }
    static computeTerraformRatingBump(player, inputTr = {}) {
        if (!PartyHooks_1.PartyHooks.shouldApplyPolicy(player, PartyName_1.PartyName.REDS, 'rp01'))
            return 0;
        let tr = inputTr instanceof Function ? inputTr(player) : inputTr;
        tr = { ...tr };
        let total = 0;
        if (tr.oxygen !== undefined) {
            const availableSteps = constants.MAX_OXYGEN_LEVEL - player.game.getOxygenLevel();
            const steps = Math.min(availableSteps, tr.oxygen);
            total = total + steps;
            if (player.game.getOxygenLevel() < constants.OXYGEN_LEVEL_FOR_TEMPERATURE_BONUS &&
                player.game.getOxygenLevel() + steps >= constants.OXYGEN_LEVEL_FOR_TEMPERATURE_BONUS) {
                tr.temperature = (tr.temperature ?? 0) + 1;
            }
        }
        if (tr.temperature !== undefined) {
            const availableSteps = Math.floor((constants.MAX_TEMPERATURE - player.game.getTemperature()) / 2);
            const steps = Math.min(availableSteps, tr.temperature);
            total = total + steps;
            if (player.game.getTemperature() < constants.TEMPERATURE_FOR_OCEAN_BONUS &&
                player.game.getTemperature() + (steps * 2) >= constants.TEMPERATURE_FOR_OCEAN_BONUS) {
                tr.oceans = (tr.oceans ?? 0) + 1;
            }
        }
        if (tr.oceans !== undefined) {
            const availableSteps = constants.MAX_OCEAN_TILES - player.game.board.getOceanSpaces().length;
            const steps = Math.min(availableSteps, tr.oceans);
            total = total + steps;
        }
        if (tr.venus !== undefined) {
            const availableSteps = Math.floor((constants.MAX_VENUS_SCALE - player.game.getVenusScaleLevel()) / 2);
            const steps = Math.min(availableSteps, tr.venus);
            total = total + steps;
            if (player.game.getVenusScaleLevel() < constants.VENUS_LEVEL_FOR_TR_BONUS &&
                player.game.getVenusScaleLevel() + (steps * 2) >= constants.VENUS_LEVEL_FOR_TR_BONUS) {
                tr.tr = (tr.tr ?? 0) + 1;
            }
        }
        MoonExpansion_1.MoonExpansion.ifMoon(player.game, (moonData) => {
            if (tr.moonHabitat !== undefined) {
                const availableSteps = constants.MAXIMUM_HABITAT_RATE - moonData.habitatRate;
                total = total + Math.min(availableSteps, tr.moonHabitat);
            }
            if (tr.moonMining !== undefined) {
                const availableSteps = constants.MAXIMUM_MINING_RATE - moonData.miningRate;
                total = total + Math.min(availableSteps, tr.moonMining);
            }
            if (tr.moonLogistics !== undefined) {
                const availableSteps = constants.MAXIMUM_LOGISTICS_RATE - moonData.logisticRate;
                total = total + Math.min(availableSteps, tr.moonLogistics);
            }
        });
        total += tr.tr ?? 0;
        return total;
    }
}
exports.TurmoilHandler = TurmoilHandler;
