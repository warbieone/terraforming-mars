"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UNITY_POLICY_4 = exports.UNITY_POLICY_3 = exports.UNITY_POLICY_2 = exports.UNITY_POLICY_1 = exports.UNITY_BONUS_2 = exports.UNITY_BONUS_1 = exports.Unity = void 0;
const Party_1 = require("./Party");
const PartyName_1 = require("../../../common/turmoil/PartyName");
const Tag_1 = require("../../../common/cards/Tag");
const Resource_1 = require("../../../common/Resource");
const SelectPaymentDeferred_1 = require("../../deferredActions/SelectPaymentDeferred");
const constants_1 = require("../../../common/constants");
const DeferredAction_1 = require("../../deferredActions/DeferredAction");
const OrOptions_1 = require("../../inputs/OrOptions");
const SelectCard_1 = require("../../inputs/SelectCard");
const SelectOption_1 = require("../../inputs/SelectOption");
const CardResource_1 = require("../../../common/CardResource");
const utils_1 = require("../../../common/utils/utils");
const titles_1 = require("../../inputs/titles");
const MessageBuilder_1 = require("../../logs/MessageBuilder");
class Unity extends Party_1.Party {
    constructor() {
        super(...arguments);
        this.name = PartyName_1.PartyName.UNITY;
        this.bonuses = [exports.UNITY_BONUS_1, exports.UNITY_BONUS_2];
        this.policies = [exports.UNITY_POLICY_1, exports.UNITY_POLICY_2, exports.UNITY_POLICY_3, exports.UNITY_POLICY_4];
    }
}
exports.Unity = Unity;
class UnityBonus01 {
    constructor() {
        this.id = 'ub01';
        this.description = 'Gain 1 M€ for each Venus, Earth and Jovian tag you have';
    }
    getScore(player) {
        const tags = [Tag_1.Tag.VENUS, Tag_1.Tag.EARTH, Tag_1.Tag.JOVIAN];
        return (0, utils_1.sum)(tags.map((tag) => player.tags.count(tag, 'raw')));
    }
    grant(game) {
        game.getPlayersInGenerationOrder().forEach((player) => {
            player.stock.add(Resource_1.Resource.MEGACREDITS, this.getScore(player));
        });
    }
}
class UnityBonus02 {
    constructor() {
        this.id = 'ub02';
        this.description = 'Gain 1 M€ for each Space tag you have';
    }
    getScore(player) {
        return player.tags.count(Tag_1.Tag.SPACE, 'raw');
    }
    grant(game) {
        game.getPlayersInGenerationOrder().forEach((player) => {
            player.stock.add(Resource_1.Resource.MEGACREDITS, this.getScore(player));
        });
    }
}
class UnityPolicy01 {
    constructor() {
        this.id = 'up01';
        this.description = 'Your titanium resources are worth 1 M€ extra';
    }
    onPolicyStart(game) {
        game.getPlayersInGenerationOrder().forEach((player) => {
            player.increaseTitaniumValue();
        });
    }
    onPolicyEnd(game) {
        game.getPlayersInGenerationOrder().forEach((player) => {
            player.decreaseTitaniumValue();
        });
    }
}
class UnityPolicy02 {
    constructor() {
        this.id = 'up02';
        this.description = 'Spend 4 M€ to gain 2 titanium or add 2 floaters to ANY card (Turmoil Unity)';
    }
    canAct(player) {
        return player.canAfford(4) && player.politicalAgendasActionUsedCount < constants_1.POLITICAL_AGENDAS_MAX_ACTION_USES;
    }
    action(player) {
        const game = player.game;
        game.log('${0} used Turmoil ${1} action', (b) => b.player(player).partyName(PartyName_1.PartyName.UNITY));
        player.politicalAgendasActionUsedCount += 1;
        game.defer(new SelectPaymentDeferred_1.SelectPaymentDeferred(player, 4, { title: titles_1.TITLES.payForPartyAction(PartyName_1.PartyName.UNITY) }))
            .andThen(() => {
            const availableFloaterCards = player.getResourceCards(CardResource_1.CardResource.FLOATER);
            const orOptions = new OrOptions_1.OrOptions();
            if (availableFloaterCards.length === 1) {
                orOptions.options.push(new SelectOption_1.SelectOption((0, MessageBuilder_1.message)('Add ${0} floaters to ${1}', (b) => b.number(2).card(availableFloaterCards[0]))).andThen(() => {
                    player.addResourceTo(availableFloaterCards[0], { qty: 2, log: true });
                    return undefined;
                }));
            }
            else if (availableFloaterCards.length > 1) {
                orOptions.options.push(new SelectOption_1.SelectOption('Add 2 floaters to a card').andThen(() => {
                    return new SelectCard_1.SelectCard('Select card to add 2 floaters', 'Add floaters', availableFloaterCards)
                        .andThen(([card]) => {
                        player.addResourceTo(card, { qty: 2, log: true });
                        return undefined;
                    });
                }));
            }
            orOptions.options.push(new SelectOption_1.SelectOption('Gain 2 titanium').andThen(() => {
                player.stock.add(Resource_1.Resource.TITANIUM, 2);
                game.log('${0} gained 2 titanium', (b) => b.player(player));
                return undefined;
            }));
            if (orOptions.options.length === 1)
                return orOptions.options[0].cb();
            game.defer(new DeferredAction_1.SimpleDeferredAction(player, () => orOptions));
            return undefined;
        });
        return undefined;
    }
}
class UnityPolicy03 {
    constructor() {
        this.id = 'up03';
        this.description = 'Spend 4 M€ to draw a Space card (Turmoil Unity)';
    }
    canAct(player) {
        return player.canAfford(4) && player.politicalAgendasActionUsedCount < constants_1.POLITICAL_AGENDAS_MAX_ACTION_USES;
    }
    action(player) {
        const game = player.game;
        game.log('${0} used Turmoil ${1} action', (b) => b.player(player).partyName(PartyName_1.PartyName.UNITY));
        player.politicalAgendasActionUsedCount += 1;
        game.defer(new SelectPaymentDeferred_1.SelectPaymentDeferred(player, 4, { title: titles_1.TITLES.payForPartyAction(PartyName_1.PartyName.UNITY) }))
            .andThen(() => player.drawCard(1, { tag: Tag_1.Tag.SPACE }));
        return undefined;
    }
}
class UnityPolicy04 {
    constructor() {
        this.id = 'up04';
        this.description = 'Cards with Space tags cost 2 M€ less to play';
    }
}
exports.UNITY_BONUS_1 = new UnityBonus01();
exports.UNITY_BONUS_2 = new UnityBonus02();
exports.UNITY_POLICY_1 = new UnityPolicy01();
exports.UNITY_POLICY_2 = new UnityPolicy02();
exports.UNITY_POLICY_3 = new UnityPolicy03();
exports.UNITY_POLICY_4 = new UnityPolicy04();
//# sourceMappingURL=Unity.js.map