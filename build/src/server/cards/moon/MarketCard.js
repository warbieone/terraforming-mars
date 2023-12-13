"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketCard = void 0;
const SelectPaymentDeferred_1 = require("../../deferredActions/SelectPaymentDeferred");
const OrOptions_1 = require("../../inputs/OrOptions");
const SelectAmount_1 = require("../../inputs/SelectAmount");
const SelectOption_1 = require("../../inputs/SelectOption");
const Resource_1 = require("../../../common/Resource");
const Card_1 = require("../Card");
const MessageBuilder_1 = require("../../logs/MessageBuilder");
const PathfindersExpansion_1 = require("../..//pathfinders/PathfindersExpansion");
class MarketCard extends Card_1.Card {
    constructor(tradeResource, buyingTerms, sellingTerms, properties) {
        super(properties);
        this.tradeResource = tradeResource;
        this.buyingTerms = buyingTerms;
        this.sellingTerms = sellingTerms;
    }
    canBuy(player) {
        return player.spendableMegacredits() >= this.buyingTerms.from;
    }
    canSell(player) {
        return player.stock.get(this.tradeResource) >= this.sellingTerms.from;
    }
    canAct(player) {
        return this.canBuy(player) || this.canSell(player);
    }
    action(player) {
        const offerBuy = this.canBuy(player);
        const offerSell = this.canSell(player);
        if (offerBuy && offerSell) {
            return new OrOptions_1.OrOptions(new SelectOption_1.SelectOption((0, MessageBuilder_1.message)('Buy ${0}', (b) => b.string(this.tradeResource)), 'Buy').andThen(() => this.getBuyingOption(player)), new SelectOption_1.SelectOption((0, MessageBuilder_1.message)('Sell ${0}', (b) => b.string(this.tradeResource)), 'Sell').andThen(() => this.getSellingOption(player)));
        }
        else if (offerBuy) {
            return this.getBuyingOption(player);
        }
        else if (offerSell) {
            return this.getSellingOption(player);
        }
        return undefined;
    }
    getBuyingOption(player) {
        const availableMC = player.spendableMegacredits();
        const terms = this.buyingTerms;
        let limit = Math.floor(availableMC / terms.from);
        limit = Math.min(limit, terms.limit);
        return new SelectAmount_1.SelectAmount((0, MessageBuilder_1.message)('Select a number of trades (${0} M€ => ${1} ${2}, max ${3})', (b) => b.number(terms.from).number(terms.to).string(this.tradeResource).number(limit)), `Buy ${this.tradeResource}`, 1, limit).andThen((tradesRequested) => {
            const cashDue = tradesRequested * terms.from;
            const unitsEarned = tradesRequested * terms.to;
            player.game.defer(new SelectPaymentDeferred_1.SelectPaymentDeferred(player, cashDue))
                .andThen(() => player.stock.add(this.tradeResource, unitsEarned, { log: true }));
            return undefined;
        });
    }
    getSellingOption(player) {
        const terms = this.sellingTerms;
        if (terms.from !== 1) {
            throw new Error('selling from !== 1 not yet supported.');
        }
        let limit = player.stock.get(this.tradeResource);
        limit = Math.min(limit, terms.limit);
        return new SelectAmount_1.SelectAmount((0, MessageBuilder_1.message)('Select a number of trades (${0} ${1} => ${2} M€, max ${3})', (b) => b.number(terms.from).string(this.tradeResource).number(terms.to).number(limit)), `Sell ${this.tradeResource}`, 1, limit).andThen((unitsSold) => {
            const cashEarned = unitsSold * terms.to;
            player.stock.add(Resource_1.Resource.MEGACREDITS, cashEarned);
            player.stock.deduct(this.tradeResource, unitsSold);
            PathfindersExpansion_1.PathfindersExpansion.addToSolBank(player);
            player.game.log('${0} sold ${1} ${2}', (b) => b.player(player).number(unitsSold).string(this.tradeResource));
            return undefined;
        });
    }
}
exports.MarketCard = MarketCard;
//# sourceMappingURL=MarketCard.js.map