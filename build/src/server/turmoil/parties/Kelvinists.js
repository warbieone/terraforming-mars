"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KELVINISTS_POLICY_4 = exports.KELVINISTS_POLICY_3 = exports.KELVINISTS_POLICY_2 = exports.KELVINISTS_POLICY_1 = exports.KELVINISTS_BONUS_2 = exports.KELVINISTS_BONUS_1 = exports.Kelvinists = void 0;
const Party_1 = require("./Party");
const PartyName_1 = require("../../../common/turmoil/PartyName");
const Resource_1 = require("../../../common/Resource");
const SelectPaymentDeferred_1 = require("../../deferredActions/SelectPaymentDeferred");
const constants_1 = require("../../../common/constants");
const CardName_1 = require("../../../common/cards/CardName");
class Kelvinists extends Party_1.Party {
    constructor() {
        super(...arguments);
        this.name = PartyName_1.PartyName.KELVINISTS;
        this.description = 'Pushes for rapid terraforming, usually employing a heat-first strategy.';
        this.bonuses = [exports.KELVINISTS_BONUS_1, exports.KELVINISTS_BONUS_2];
        this.policies = [exports.KELVINISTS_POLICY_1, exports.KELVINISTS_POLICY_2, exports.KELVINISTS_POLICY_3, exports.KELVINISTS_POLICY_4];
    }
}
exports.Kelvinists = Kelvinists;
class KelvinistsBonus01 {
    constructor() {
        this.id = 'kb01';
        this.isDefault = true;
        this.description = 'Gain 1 M€ for each heat production you have';
    }
    getScore(player) {
        return player.production.heat;
    }
    grant(game) {
        game.getPlayersInGenerationOrder().forEach((player) => {
            player.addResource(Resource_1.Resource.MEGACREDITS, this.getScore(player));
        });
    }
}
class KelvinistsBonus02 {
    constructor() {
        this.id = 'kb02';
        this.description = 'Gain 1 heat for each heat production you have';
        this.isDefault = false;
    }
    getScore(player) {
        return player.production.heat;
    }
    grant(game) {
        game.getPlayersInGenerationOrder().forEach((player) => {
            player.addResource(Resource_1.Resource.HEAT, this.getScore(player));
        });
    }
}
class KelvinistsPolicy01 {
    constructor() {
        this.isDefault = true;
        this.id = 'kp01';
    }
    description(player) {
        const cost = player === undefined ? 10 : this.cost(player);
        return `Pay ${cost} M€ to increase your energy and heat production 1 step (Turmoil Kelvinists)`;
    }
    cost(player) {
        return player.cardIsInEffect(CardName_1.CardName.HIGH_TEMP_SUPERCONDUCTORS) ? 7 : 10;
    }
    canAct(player) {
        return player.canAfford(this.cost(player));
    }
    action(player) {
        const game = player.game;
        game.log('${0} used Turmoil Kelvinists action', (b) => b.player(player));
        game.defer(new SelectPaymentDeferred_1.SelectPaymentDeferred(player, this.cost(player), {
            title: 'Select how to pay for Turmoil Kelvinists action',
            afterPay: () => {
                player.production.add(Resource_1.Resource.ENERGY, 1);
                player.production.add(Resource_1.Resource.HEAT, 1);
                game.log('${0} increased heat and energy production 1 step', (b) => b.player(player));
            },
        }));
        return undefined;
    }
}
class KelvinistsPolicy02 {
    constructor() {
        this.id = 'kp02';
        this.description = 'When you raise temperature, gain 3 M€ per step raised';
        this.isDefault = false;
    }
}
class KelvinistsPolicy03 {
    constructor() {
        this.id = 'kp03';
        this.description = 'Convert 6 heat into temperature (Turmoil Kelvinists)';
        this.isDefault = false;
    }
    canAct(player) {
        return player.availableHeat() >= 6 && player.game.getTemperature() < constants_1.MAX_TEMPERATURE;
    }
    action(player) {
        const game = player.game;
        game.log('${0} used Turmoil Kelvinists action', (b) => b.player(player));
        game.log('${0} spent 6 heat to raise temperature 1 step', (b) => b.player(player));
        return player.spendHeat(6, () => {
            game.increaseTemperature(player, 1);
            return undefined;
        });
    }
}
class KelvinistsPolicy04 {
    constructor() {
        this.id = 'kp04';
        this.description = 'When you place a tile, gain 2 heat';
        this.isDefault = false;
    }
    onTilePlaced(player) {
        player.addResource(Resource_1.Resource.HEAT, 2);
    }
}
exports.KELVINISTS_BONUS_1 = new KelvinistsBonus01();
exports.KELVINISTS_BONUS_2 = new KelvinistsBonus02();
exports.KELVINISTS_POLICY_1 = new KelvinistsPolicy01();
exports.KELVINISTS_POLICY_2 = new KelvinistsPolicy02();
exports.KELVINISTS_POLICY_3 = new KelvinistsPolicy03();
exports.KELVINISTS_POLICY_4 = new KelvinistsPolicy04();
