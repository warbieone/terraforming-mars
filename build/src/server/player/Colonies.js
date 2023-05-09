"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TradeWithMegacredits = exports.TradeWithTitanium = exports.TradeWithEnergy = exports.Colonies = void 0;
const constants_1 = require("../../common/constants");
const CardName_1 = require("../../common/cards/CardName");
const ColoniesHandler_1 = require("../colonies/ColoniesHandler");
const AndOptions_1 = require("../inputs/AndOptions");
const constants_2 = require("../../common/constants");
const SelectPaymentDeferred_1 = require("../deferredActions/SelectPaymentDeferred");
const Resource_1 = require("../../common/Resource");
const TitanFloatingLaunchPad_1 = require("../cards/colonies/TitanFloatingLaunchPad");
const OrOptions_1 = require("../inputs/OrOptions");
const SelectOption_1 = require("../inputs/SelectOption");
const SelectColony_1 = require("../inputs/SelectColony");
const CollegiumCopernicus_1 = require("../cards/pathfinders/CollegiumCopernicus");
const MessageBuilder_1 = require("../logs/MessageBuilder");
class Colonies {
    constructor(player) {
        this.fleetSize = 1;
        this.tradesThisGeneration = 0;
        this.tradeOffset = 0;
        this.tradeDiscount = 0;
        this.victoryPoints = 0;
        this.cardDiscount = 0;
        this.player = player;
    }
    canTrade() {
        return ColoniesHandler_1.ColoniesHandler.tradeableColonies(this.player.game).length > 0 &&
            this.getFleetSize() > this.tradesThisGeneration;
    }
    coloniesTradeAction() {
        const game = this.player.game;
        if (game.gameOptions.coloniesExtension) {
            const openColonies = ColoniesHandler_1.ColoniesHandler.tradeableColonies(game);
            if (openColonies.length > 0 &&
                this.fleetSize > this.tradesThisGeneration) {
                return this.tradeWithColony(openColonies);
            }
        }
        return undefined;
    }
    tradeWithColony(openColonies) {
        const player = this.player;
        const handlers = [
            new TitanFloatingLaunchPad_1.TradeWithTitanFloatingLaunchPad(player),
            new CollegiumCopernicus_1.TradeWithCollegiumCopernicus(player),
            new TradeWithEnergy(player),
            new TradeWithTitanium(player),
            new TradeWithMegacredits(player),
        ];
        let selected = undefined;
        const howToPayForTrade = new OrOptions_1.OrOptions();
        howToPayForTrade.title = 'Pay trade fee';
        howToPayForTrade.buttonLabel = 'Pay';
        handlers.forEach((handler) => {
            if (handler.canUse()) {
                howToPayForTrade.options.push(new SelectOption_1.SelectOption(handler.optionText(), '', () => {
                    selected = handler;
                    return undefined;
                }));
            }
        });
        if (howToPayForTrade.options.length === 0) {
            return undefined;
        }
        const selectColony = new SelectColony_1.SelectColony('Select colony tile for trade', 'trade', openColonies, (colony) => {
            if (selected === undefined) {
                throw new Error(`Unexpected condition: no trade funding source selected when trading with ${colony.name}.`);
            }
            selected.trade(colony);
            return undefined;
        });
        const trade = new AndOptions_1.AndOptions(() => {
            return undefined;
        }, howToPayForTrade, selectColony);
        trade.title = 'Trade with a colony tile';
        trade.buttonLabel = 'Trade';
        return trade;
    }
    getPlayableColonies(allowDuplicate = false) {
        return this.player.game.colonies
            .filter((colony) => colony.isActive && !colony.isFull())
            .filter((colony) => allowDuplicate || !colony.colonies.includes(this.player.id));
    }
    calculateVictoryPoints(victoryPointsBreakdown) {
        if (this.player.colonies.victoryPoints > 0) {
            victoryPointsBreakdown.setVictoryPoints('victoryPoints', this.victoryPoints, 'Colony VP');
        }
    }
    getFleetSize() {
        return this.fleetSize;
    }
    increaseFleetSize() {
        if (this.fleetSize < constants_1.MAX_FLEET_SIZE)
            this.fleetSize++;
    }
    decreaseFleetSize() {
        if (this.fleetSize > 0)
            this.fleetSize--;
    }
    setFleetSize(fleetSize) {
        this.fleetSize = fleetSize;
    }
    returnTradeFleets() {
        const syndicatePirateRaider = this.player.game.syndicatePirateRaider;
        if (syndicatePirateRaider === undefined) {
            this.tradesThisGeneration = 0;
        }
        else if (syndicatePirateRaider === this.player.id) {
            this.tradesThisGeneration = 0;
        }
    }
}
exports.Colonies = Colonies;
class TradeWithEnergy {
    constructor(player) {
        this.player = player;
        this.tradeCost = constants_2.ENERGY_TRADE_COST - player.colonies.tradeDiscount;
    }
    canUse() {
        return this.player.energy >= this.tradeCost;
    }
    optionText() {
        return (0, MessageBuilder_1.newMessage)('Pay ${0} energy', (b) => b.number(this.tradeCost));
    }
    trade(colony) {
        this.player.deductResource(Resource_1.Resource.ENERGY, this.tradeCost);
        this.player.game.log('${0} spent ${1} energy to trade with ${2}', (b) => b.player(this.player).number(this.tradeCost).colony(colony));
        colony.trade(this.player);
    }
}
exports.TradeWithEnergy = TradeWithEnergy;
class TradeWithTitanium {
    constructor(player) {
        this.player = player;
        this.tradeCost = constants_2.TITANIUM_TRADE_COST - player.colonies.tradeDiscount;
    }
    canUse() {
        return this.player.titanium >= this.tradeCost;
    }
    optionText() {
        return (0, MessageBuilder_1.newMessage)('Pay ${0} titanium', (b) => b.number(this.tradeCost));
    }
    trade(colony) {
        this.player.deductResource(Resource_1.Resource.TITANIUM, this.tradeCost);
        this.player.game.log('${0} spent ${1} titanium to trade with ${2}', (b) => b.player(this.player).number(this.tradeCost).colony(colony));
        colony.trade(this.player);
    }
}
exports.TradeWithTitanium = TradeWithTitanium;
class TradeWithMegacredits {
    constructor(player) {
        this.player = player;
        this.tradeCost = constants_2.MC_TRADE_COST - player.colonies.tradeDiscount;
        const adhai = player.getCorporation(CardName_1.CardName.ADHAI_HIGH_ORBIT_CONSTRUCTIONS);
        if (adhai !== undefined) {
            const adhaiDiscount = Math.floor(adhai.resourceCount / 2);
            this.tradeCost = Math.max(0, this.tradeCost - adhaiDiscount);
        }
    }
    canUse() {
        return this.player.canAfford(this.tradeCost);
    }
    optionText() {
        return (0, MessageBuilder_1.newMessage)('Pay ${0} M€', (b) => b.number(this.tradeCost));
    }
    trade(colony) {
        this.player.game.defer(new SelectPaymentDeferred_1.SelectPaymentDeferred(this.player, this.tradeCost, {
            title: (0, MessageBuilder_1.newMessage)('Select how to pay ${0} for colony trade', (b) => b.number(this.tradeCost)),
            afterPay: () => {
                this.player.game.log('${0} spent ${1} M€ to trade with ${2}', (b) => b.player(this.player).number(this.tradeCost).colony(colony));
                colony.trade(this.player);
            },
        }));
    }
}
exports.TradeWithMegacredits = TradeWithMegacredits;
