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
        var _a;
        const turmoil = player.game.turmoil;
        if (turmoil === undefined) {
            return undefined;
        }
        const policy = turmoil.rulingPolicy();
        if ((_a = policy.canAct) === null || _a === void 0 ? void 0 : _a.call(policy, player)) {
            return new SelectOption_1.SelectOption((0, Policy_1.policyDescription)(policy, player), 'Pay').andThen(() => { var _a; return (_a = policy.action) === null || _a === void 0 ? void 0 : _a.call(policy, player); });
        }
        return undefined;
    }
    static applyOnCardPlayedEffect(player, selectedCard) {
        if (PartyHooks_1.PartyHooks.shouldApplyPolicy(player, PartyName_1.PartyName.GREENS, 'gp03')) {
            const policy = Greens_1.GREENS_POLICY_3;
            policy.onCardPlayed(player, selectedCard);
        }
        if (PartyHooks_1.PartyHooks.shouldApplyPolicy(player, PartyName_1.PartyName.MARS, 'mfp02')) {
            const policy = MarsFirst_1.MARS_FIRST_POLICY_2;
            policy.onCardPlayed(player, selectedCard);
        }
    }
    static resolveTilePlacementCosts(player) {
        if (PartyHooks_1.PartyHooks.shouldApplyPolicy(player, PartyName_1.PartyName.REDS, 'rp02')) {
            const redsPolicy = Reds_1.REDS_POLICY_2;
            redsPolicy.onTilePlaced(player);
        }
    }
    static resolveTilePlacementBonuses(player, spaceType) {
        PartyHooks_1.PartyHooks.applyMarsFirstRulingPolicy(player, spaceType);
        if (PartyHooks_1.PartyHooks.shouldApplyPolicy(player, PartyName_1.PartyName.GREENS, 'gp02')) {
            const greensPolicy = Greens_1.GREENS_POLICY_2;
            greensPolicy.onTilePlaced(player);
        }
        if (PartyHooks_1.PartyHooks.shouldApplyPolicy(player, PartyName_1.PartyName.KELVINISTS, 'kp04')) {
            const kelvinistsPolicy = Kelvinists_1.KELVINISTS_POLICY_4;
            kelvinistsPolicy.onTilePlaced(player);
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
        var _a, _b, _c, _d;
        if (!PartyHooks_1.PartyHooks.shouldApplyPolicy(player, PartyName_1.PartyName.REDS, 'rp01'))
            return 0;
        let tr = inputTr instanceof Function ? inputTr(player) : inputTr;
        tr = Object.assign({}, tr);
        let total = 0;
        if (tr.oxygen !== undefined) {
            const availableSteps = constants.MAX_OXYGEN_LEVEL - player.game.getOxygenLevel();
            const steps = Math.min(availableSteps, tr.oxygen);
            total = total + steps;
            if (player.game.getOxygenLevel() < constants.OXYGEN_LEVEL_FOR_TEMPERATURE_BONUS &&
                player.game.getOxygenLevel() + steps >= constants.OXYGEN_LEVEL_FOR_TEMPERATURE_BONUS) {
                tr.temperature = ((_a = tr.temperature) !== null && _a !== void 0 ? _a : 0) + 1;
            }
        }
        if (tr.temperature !== undefined) {
            const availableSteps = Math.floor((constants.MAX_TEMPERATURE - player.game.getTemperature()) / 2);
            const steps = Math.min(availableSteps, tr.temperature);
            total = total + steps;
            if (player.game.getTemperature() < constants.TEMPERATURE_FOR_OCEAN_BONUS &&
                player.game.getTemperature() + (steps * 2) >= constants.TEMPERATURE_FOR_OCEAN_BONUS) {
                tr.oceans = ((_b = tr.oceans) !== null && _b !== void 0 ? _b : 0) + 1;
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
                tr.tr = ((_c = tr.tr) !== null && _c !== void 0 ? _c : 0) + 1;
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
        total += (_d = tr.tr) !== null && _d !== void 0 ? _d : 0;
        return total;
    }
}
exports.TurmoilHandler = TurmoilHandler;
//# sourceMappingURL=TurmoilHandler.js.map