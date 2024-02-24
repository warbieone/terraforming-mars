"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GREENS_POLICY_4 = exports.GREENS_POLICY_3 = exports.GREENS_POLICY_2 = exports.GREENS_POLICY_1 = exports.GREENS_BONUS_2 = exports.GREENS_BONUS_1 = exports.Greens = void 0;
const Party_1 = require("./Party");
const PartyName_1 = require("../../../common/turmoil/PartyName");
const Tag_1 = require("../../../common/cards/Tag");
const Resource_1 = require("../../../common/Resource");
const OrOptions_1 = require("../../inputs/OrOptions");
const SelectCard_1 = require("../../inputs/SelectCard");
const SelectOption_1 = require("../../inputs/SelectOption");
const CardResource_1 = require("../../../common/CardResource");
const Phase_1 = require("../../../common/Phase");
const SelectPaymentDeferred_1 = require("../../deferredActions/SelectPaymentDeferred");
const constants_1 = require("../../../common/constants");
const Board_1 = require("../../boards/Board");
const titles_1 = require("../../inputs/titles");
const MessageBuilder_1 = require("../../logs/MessageBuilder");
class Greens extends Party_1.Party {
    constructor() {
        super(...arguments);
        this.name = PartyName_1.PartyName.GREENS;
        this.bonuses = [exports.GREENS_BONUS_1, exports.GREENS_BONUS_2];
        this.policies = [exports.GREENS_POLICY_1, exports.GREENS_POLICY_2, exports.GREENS_POLICY_3, exports.GREENS_POLICY_4];
    }
}
exports.Greens = Greens;
class GreensBonus01 {
    constructor() {
        this.id = 'gb01';
        this.description = 'Gain 1 M€ for each Plant, Microbe and Animal tag you have';
    }
    getScore(player) {
        return player.tags.count(Tag_1.Tag.PLANT, 'raw') +
            player.tags.count(Tag_1.Tag.MICROBE, 'raw') +
            player.tags.count(Tag_1.Tag.ANIMAL, 'raw');
    }
    grant(game) {
        game.getPlayersInGenerationOrder().forEach((player) => {
            player.stock.add(Resource_1.Resource.MEGACREDITS, this.getScore(player));
        });
    }
}
class GreensBonus02 {
    constructor() {
        this.id = 'gb02';
        this.description = 'Gain 2 M€ for each greenery tile you have';
    }
    getScore(player) {
        const boardSpaces = player.game.board.spaces;
        const count = boardSpaces.filter((space) => Board_1.Board.isGreenerySpace(space) && Board_1.Board.spaceOwnedBy(space, player)).length;
        return count * 2;
    }
    grant(game) {
        game.getPlayersInGenerationOrder().forEach((player) => {
            player.stock.add(Resource_1.Resource.MEGACREDITS, this.getScore(player));
        });
    }
}
class GreensPolicy01 {
    constructor() {
        this.id = 'gp01';
        this.description = 'When you place a greenery tile, gain 4 M€';
    }
    onTilePlaced(player, space) {
        if (Board_1.Board.isGreenerySpace(space) && player.game.phase === Phase_1.Phase.ACTION) {
            player.stock.add(Resource_1.Resource.MEGACREDITS, 4);
        }
    }
}
class GreensPolicy02 {
    constructor() {
        this.id = 'gp02';
        this.description = 'When you place a tile, gain 1 plant';
    }
    onTilePlaced(player) {
        player.stock.add(Resource_1.Resource.PLANTS, 1);
    }
}
class GreensPolicy03 {
    constructor() {
        this.id = 'gp03';
        this.description = 'When you play an animal, plant or microbe tag, gain 2 M€';
    }
    onCardPlayed(player, card) {
        const tags = [Tag_1.Tag.ANIMAL, Tag_1.Tag.PLANT, Tag_1.Tag.MICROBE];
        const tagCount = card.tags.filter((tag) => tags.includes(tag)).length;
        player.stock.add(Resource_1.Resource.MEGACREDITS, tagCount * 2);
    }
}
class GreensPolicy04 {
    constructor() {
        this.id = 'gp04';
        this.description = 'Spend 5 M€ to gain 3 plants or add 2 microbes to ANY card (Turmoil Greens)';
    }
    canAct(player) {
        return player.canAfford(5) && player.politicalAgendasActionUsedCount < constants_1.POLITICAL_AGENDAS_MAX_ACTION_USES;
    }
    action(player) {
        const game = player.game;
        game.log('${0} used Turmoil ${1} action', (b) => b.player(player).partyName(PartyName_1.PartyName.GREENS));
        player.politicalAgendasActionUsedCount += 1;
        game.defer(new SelectPaymentDeferred_1.SelectPaymentDeferred(player, 5, { title: titles_1.TITLES.payForPartyAction(PartyName_1.PartyName.GREENS) }))
            .andThen(() => {
            const availableMicrobeCards = player.getResourceCards(CardResource_1.CardResource.MICROBE);
            const orOptions = new OrOptions_1.OrOptions();
            if (availableMicrobeCards.length === 1) {
                orOptions.options.push(new SelectOption_1.SelectOption((0, MessageBuilder_1.message)('Add ${0} microbes to ${1}', (b) => b.number(2).card(availableMicrobeCards[0]))).andThen(() => {
                    player.addResourceTo(availableMicrobeCards[0], { qty: 2, log: true });
                    return undefined;
                }));
            }
            else if (availableMicrobeCards.length > 1) {
                orOptions.options.push(new SelectOption_1.SelectOption('Add 2 microbes to a card').andThen(() => {
                    return new SelectCard_1.SelectCard('Select card to add 2 microbes', 'Add microbes', availableMicrobeCards)
                        .andThen(([card]) => {
                        player.addResourceTo(card, { qty: 2, log: true });
                        return undefined;
                    });
                }));
            }
            orOptions.options.push(new SelectOption_1.SelectOption('Gain 3 plants').andThen(() => {
                player.stock.add(Resource_1.Resource.PLANTS, 3);
                game.log('${0} gained 3 plants', (b) => b.player(player));
                return undefined;
            }));
            if (orOptions.options.length === 1)
                return orOptions.options[0].cb();
            player.defer(orOptions);
            return undefined;
        });
        return undefined;
    }
}
exports.GREENS_BONUS_1 = new GreensBonus01();
exports.GREENS_BONUS_2 = new GreensBonus02();
exports.GREENS_POLICY_1 = new GreensPolicy01();
exports.GREENS_POLICY_2 = new GreensPolicy02();
exports.GREENS_POLICY_3 = new GreensPolicy03();
exports.GREENS_POLICY_4 = new GreensPolicy04();
