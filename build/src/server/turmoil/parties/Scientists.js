"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SCIENTISTS_POLICY_4 = exports.SCIENTISTS_POLICY_3 = exports.SCIENTISTS_POLICY_2 = exports.SCIENTISTS_POLICY_1 = exports.SCIENTISTS_BONUS_2 = exports.SCIENTISTS_BONUS_1 = exports.Scientists = void 0;
const Party_1 = require("./Party");
const PartyName_1 = require("../../../common/turmoil/PartyName");
const Tag_1 = require("../../../common/cards/Tag");
const Resource_1 = require("../../../common/Resource");
const SelectPaymentDeferred_1 = require("../../deferredActions/SelectPaymentDeferred");
const titles_1 = require("../../inputs/titles");
class Scientists extends Party_1.Party {
    constructor() {
        super(...arguments);
        this.name = PartyName_1.PartyName.SCIENTISTS;
        this.bonuses = [exports.SCIENTISTS_BONUS_1, exports.SCIENTISTS_BONUS_2];
        this.policies = [exports.SCIENTISTS_POLICY_1, exports.SCIENTISTS_POLICY_2, exports.SCIENTISTS_POLICY_3, exports.SCIENTISTS_POLICY_4];
    }
}
exports.Scientists = Scientists;
class ScientistsBonus01 {
    constructor() {
        this.id = 'sb01';
        this.description = 'Gain 1 M€ for each science tag you have';
    }
    getScore(player) {
        return player.tags.count(Tag_1.Tag.SCIENCE, 'raw-pf');
    }
    grant(game) {
        game.getPlayersInGenerationOrder().forEach((player) => {
            player.stock.add(Resource_1.Resource.MEGACREDITS, this.getScore(player));
        });
    }
}
class ScientistsBonus02 {
    constructor() {
        this.id = 'sb02';
        this.description = 'Gain 1 M€ for every 3 cards in hand';
    }
    getScore(player) {
        return Math.floor(player.cardsInHand.length / 3);
    }
    grant(game) {
        game.getPlayersInGenerationOrder().forEach((player) => {
            player.stock.add(Resource_1.Resource.MEGACREDITS, this.getScore(player));
        });
    }
}
class ScientistsPolicy01 {
    constructor() {
        this.id = 'sp01';
        this.description = 'Pay 10 M€ to draw 3 cards (Turmoil Scientists)';
    }
    canAct(player) {
        return player.canAfford(10) && player.turmoilPolicyActionUsed === false;
    }
    action(player) {
        const game = player.game;
        game.log('${0} used Turmoil ${1} action', (b) => b.player(player).partyName(PartyName_1.PartyName.SCIENTISTS));
        game.defer(new SelectPaymentDeferred_1.SelectPaymentDeferred(player, 10, { title: titles_1.TITLES.payForPartyAction(PartyName_1.PartyName.SCIENTISTS) }))
            .andThen(() => {
            player.drawCard(3);
            player.turmoilPolicyActionUsed = true;
        });
        return undefined;
    }
}
class ScientistsPolicy02 {
    constructor() {
        this.id = 'sp02';
        this.description = 'Your global requirements are +/- 2 steps';
    }
}
class ScientistsPolicy03 {
    constructor() {
        this.id = 'sp03';
        this.description = 'When you raise a global parameter, draw a card per step raised';
    }
}
class ScientistsPolicy04 {
    constructor() {
        this.id = 'sp04';
        this.description = 'Cards with Science tag requirements may be played with 1 less Science tag';
    }
    onPolicyStart(game) {
        game.getPlayersInGenerationOrder().forEach((player) => {
            player.hasTurmoilScienceTagBonus = true;
        });
    }
    onPolicyEnd(game) {
        game.getPlayersInGenerationOrder().forEach((player) => {
            player.hasTurmoilScienceTagBonus = false;
        });
    }
}
exports.SCIENTISTS_BONUS_1 = new ScientistsBonus01();
exports.SCIENTISTS_BONUS_2 = new ScientistsBonus02();
exports.SCIENTISTS_POLICY_1 = new ScientistsPolicy01();
exports.SCIENTISTS_POLICY_2 = new ScientistsPolicy02();
exports.SCIENTISTS_POLICY_3 = new ScientistsPolicy03();
exports.SCIENTISTS_POLICY_4 = new ScientistsPolicy04();
//# sourceMappingURL=Scientists.js.map