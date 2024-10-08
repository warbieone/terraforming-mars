"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MARS_FIRST_POLICY_4 = exports.MARS_FIRST_POLICY_3 = exports.MARS_FIRST_POLICY_2 = exports.MARS_FIRST_POLICY_1 = exports.MARS_FIRST_BONUS_2 = exports.MARS_FIRST_BONUS_1 = exports.MarsFirst = void 0;
const Party_1 = require("./Party");
const PartyName_1 = require("../../../common/turmoil/PartyName");
const Tag_1 = require("../../../common/cards/Tag");
const Resource_1 = require("../../../common/Resource");
const Bonus_1 = require("../Bonus");
const SpaceType_1 = require("../../../common/boards/SpaceType");
const Policy_1 = require("../Policy");
const Phase_1 = require("../../../common/Phase");
const SelectPaymentDeferred_1 = require("../../deferredActions/SelectPaymentDeferred");
const constants_1 = require("../../../common/constants");
const titles_1 = require("../../inputs/titles");
class MarsFirst extends Party_1.Party {
    constructor() {
        super(...arguments);
        this.name = PartyName_1.PartyName.MARS;
        this.bonuses = [exports.MARS_FIRST_BONUS_1, exports.MARS_FIRST_BONUS_2];
        this.policies = [exports.MARS_FIRST_POLICY_1, exports.MARS_FIRST_POLICY_2, exports.MARS_FIRST_POLICY_3, exports.MARS_FIRST_POLICY_4];
    }
}
exports.MarsFirst = MarsFirst;
class MarsFirstBonus01 extends Bonus_1.Bonus {
    constructor() {
        super(...arguments);
        this.id = 'mb01';
        this.description = 'Gain 1 M€ for each building tag you have';
    }
    getScore(player) {
        return player.tags.count(Tag_1.Tag.BUILDING, 'raw');
    }
    grantForPlayer(player) {
        player.stock.add(Resource_1.Resource.MEGACREDITS, this.getScore(player));
    }
}
class MarsFirstBonus02 extends Bonus_1.Bonus {
    constructor() {
        super(...arguments);
        this.id = 'mb02';
        this.description = 'Gain 1 M€ for each tile you have ON MARS';
    }
    getScore(player) {
        const boardSpaces = player.game.board.spaces;
        return boardSpaces.filter((space) => space.tile !== undefined && space.player === player && space.spaceType !== SpaceType_1.SpaceType.COLONY).length;
    }
    grantForPlayer(player) {
        player.stock.add(Resource_1.Resource.MEGACREDITS, this.getScore(player));
    }
}
class MarsFirstPolicy01 {
    constructor() {
        this.id = 'mfp01';
        this.description = 'When you place a tile ON MARS, gain 1 steel';
    }
    onTilePlaced(player, space) {
        if (space.tile && space.spaceType !== SpaceType_1.SpaceType.COLONY && player.game.phase === Phase_1.Phase.ACTION) {
            player.stock.add(Resource_1.Resource.STEEL, 1);
        }
    }
}
class MarsFirstPolicy02 {
    constructor() {
        this.id = 'mfp02';
        this.description = 'When you play a building tag, gain 2 M€';
    }
    onCardPlayed(player, card) {
        if (card.tags.includes(Tag_1.Tag.BUILDING))
            player.stock.add(Resource_1.Resource.MEGACREDITS, 2);
    }
}
class MarsFirstPolicy03 extends Policy_1.Policy {
    constructor() {
        super(...arguments);
        this.id = 'mfp03';
        this.description = 'Your steel resources are worth 1 M€ extra';
    }
    onPolicyStartForPlayer(player) {
        player.increaseSteelValue();
    }
    onPolicyEndForPlayer(player) {
        player.decreaseSteelValue();
    }
}
class MarsFirstPolicy04 {
    constructor() {
        this.id = 'mfp04';
        this.description = 'Spend 4 M€ to draw a Building card (Turmoil Mars First)';
    }
    canAct(player) {
        return player.canAfford(4) && player.politicalAgendasActionUsedCount < constants_1.POLITICAL_AGENDAS_MAX_ACTION_USES;
    }
    action(player) {
        const game = player.game;
        game.log('${0} used Turmoil Mars First action', (b) => b.player(player));
        player.politicalAgendasActionUsedCount += 1;
        game.defer(new SelectPaymentDeferred_1.SelectPaymentDeferred(player, 4, { title: titles_1.TITLES.payForPartyAction(PartyName_1.PartyName.MARS) }))
            .andThen(() => player.drawCard(1, { tag: Tag_1.Tag.BUILDING }));
        return undefined;
    }
}
exports.MARS_FIRST_BONUS_1 = new MarsFirstBonus01();
exports.MARS_FIRST_BONUS_2 = new MarsFirstBonus02();
exports.MARS_FIRST_POLICY_1 = new MarsFirstPolicy01();
exports.MARS_FIRST_POLICY_2 = new MarsFirstPolicy02();
exports.MARS_FIRST_POLICY_3 = new MarsFirstPolicy03();
exports.MARS_FIRST_POLICY_4 = new MarsFirstPolicy04();
