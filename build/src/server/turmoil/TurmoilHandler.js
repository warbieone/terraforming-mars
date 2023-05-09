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
const Scientists_1 = require("./parties/Scientists");
const Unity_1 = require("./parties/Unity");
const MoonExpansion_1 = require("../moon/MoonExpansion");
class TurmoilHandler {
    constructor() { }
    static addPlayerAction(player, options) {
        if (PartyHooks_1.PartyHooks.shouldApplyPolicy(player, PartyName_1.PartyName.SCIENTISTS)) {
            const scientistsPolicy = Scientists_1.SCIENTISTS_POLICY_1;
            if (scientistsPolicy.canAct(player)) {
                options.push(new SelectOption_1.SelectOption(scientistsPolicy.description, 'Pay', () => scientistsPolicy.action(player)));
            }
        }
        if (PartyHooks_1.PartyHooks.shouldApplyPolicy(player, PartyName_1.PartyName.KELVINISTS)) {
            const kelvinistsPolicy = Kelvinists_1.KELVINISTS_POLICY_1;
            if (kelvinistsPolicy.canAct(player)) {
                options.push(new SelectOption_1.SelectOption(kelvinistsPolicy.description(player), 'Pay', () => kelvinistsPolicy.action(player)));
            }
        }
        if (PartyHooks_1.PartyHooks.shouldApplyPolicy(player, PartyName_1.PartyName.KELVINISTS, 'kp03')) {
            const kelvinistsPolicy = Kelvinists_1.KELVINISTS_POLICY_3;
            if (kelvinistsPolicy.canAct(player)) {
                options.push(new SelectOption_1.SelectOption(kelvinistsPolicy.description, 'Pay', () => kelvinistsPolicy.action(player)));
            }
        }
        if (PartyHooks_1.PartyHooks.shouldApplyPolicy(player, PartyName_1.PartyName.GREENS, 'gp04')) {
            const greensPolicy = Greens_1.GREENS_POLICY_4;
            if (greensPolicy.canAct(player)) {
                options.push(new SelectOption_1.SelectOption(greensPolicy.description, 'Pay', () => greensPolicy.action(player)));
            }
        }
        if (PartyHooks_1.PartyHooks.shouldApplyPolicy(player, PartyName_1.PartyName.MARS, 'mfp04')) {
            const marsFirstPolicy = MarsFirst_1.MARS_FIRST_POLICY_4;
            if (marsFirstPolicy.canAct(player)) {
                options.push(new SelectOption_1.SelectOption(marsFirstPolicy.description, 'Pay', () => marsFirstPolicy.action(player)));
            }
        }
        if (PartyHooks_1.PartyHooks.shouldApplyPolicy(player, PartyName_1.PartyName.UNITY, 'up02')) {
            const unityPolicy = Unity_1.UNITY_POLICY_2;
            if (unityPolicy.canAct(player)) {
                options.push(new SelectOption_1.SelectOption(unityPolicy.description, 'Pay', () => unityPolicy.action(player)));
            }
        }
        if (PartyHooks_1.PartyHooks.shouldApplyPolicy(player, PartyName_1.PartyName.UNITY, 'up03')) {
            const unityPolicy = Unity_1.UNITY_POLICY_3;
            if (unityPolicy.canAct(player)) {
                options.push(new SelectOption_1.SelectOption(unityPolicy.description, 'Pay', () => unityPolicy.action(player)));
            }
        }
        if (PartyHooks_1.PartyHooks.shouldApplyPolicy(player, PartyName_1.PartyName.REDS, 'rp03')) {
            const redsPolicy = Reds_1.REDS_POLICY_3;
            if (redsPolicy.canAct(player)) {
                options.push(new SelectOption_1.SelectOption(redsPolicy.description, 'Pay', () => redsPolicy.action(player)));
            }
        }
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
                player.addResource(Resource_1.Resource.MEGACREDITS, steps * 3);
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
        if (!PartyHooks_1.PartyHooks.shouldApplyPolicy(player, PartyName_1.PartyName.REDS))
            return 0;
        let tr = inputTr instanceof Function ? inputTr(player) : inputTr;
        tr = Object.assign({}, tr);
        let total = 0;
        if (tr.oxygen !== undefined) {
            const availableSteps = constants.MAX_OXYGEN_LEVEL - player.game.getOxygenLevel();
            const steps = Math.min(availableSteps, tr.oxygen);
            total = total + steps;
            if (player.game.getOxygenLevel() < 8 && player.game.getOxygenLevel() + steps >= 8) {
                tr.temperature = ((_a = tr.temperature) !== null && _a !== void 0 ? _a : 0) + 1;
            }
        }
        if (tr.temperature !== undefined) {
            const availableSteps = Math.floor((constants.MAX_TEMPERATURE - player.game.getTemperature()) / 2);
            const steps = Math.min(availableSteps, tr.temperature);
            total = total + steps;
            if (player.game.getTemperature() < 0 && player.game.getTemperature() + (steps * 2) >= 0) {
                tr.oceans = ((_b = tr.oceans) !== null && _b !== void 0 ? _b : 0) + 1;
            }
        }
        if (tr.oceans !== undefined) {
            const availableSteps = constants.MAX_OCEAN_TILES - player.game.board.getOceanCount();
            const steps = Math.min(availableSteps, tr.oceans);
            total = total + steps;
        }
        if (tr.venus !== undefined) {
            const availableSteps = Math.floor((constants.MAX_VENUS_SCALE - player.game.getVenusScaleLevel()) / 2);
            const steps = Math.min(availableSteps, tr.venus);
            total = total + steps;
            if (player.game.getVenusScaleLevel() < 16 && player.game.getVenusScaleLevel() + (steps * 2) >= 16) {
                tr.tr = ((_c = tr.tr) !== null && _c !== void 0 ? _c : 0) + 1;
            }
        }
        MoonExpansion_1.MoonExpansion.ifMoon(player.game, (moonData) => {
            if (tr.moonHabitat !== undefined) {
                const availableSteps = constants.MAXIMUM_HABITAT_RATE - moonData.colonyRate;
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
