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
        return player.getResource(this.tradeResource) >= this.sellingTerms.from;
    }
    canAct(player) {
        return this.canBuy(player) || this.canSell(player);
    }
    action(player) {
        const offerBuy = this.canBuy(player);
        const offerSell = this.canSell(player);
        if (offerBuy && offerSell) {
            return new OrOptions_1.OrOptions(new SelectOption_1.SelectOption((0, MessageBuilder_1.newMessage)('Buy ${0}', (b) => b.string(this.tradeResource)), 'Buy', () => this.getBuyingOption(player)), new SelectOption_1.SelectOption((0, MessageBuilder_1.newMessage)('Sell ${0}', (b) => b.string(this.tradeResource)), 'Sell', () => this.getSellingOption(player)));
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
        return new SelectAmount_1.SelectAmount((0, MessageBuilder_1.newMessage)('Select a number of trades (${terms.from} M€ => ${terms.to} ${this.tradeResource}, max ${limit})', (b) => b.number(terms.from).number(terms.to).string(this.tradeResource).number(limit)), `Buy ${this.tradeResource}`, (tradesRequested) => {
            const cashDue = tradesRequested * terms.from;
            const unitsEarned = tradesRequested * terms.to;
            player.game.defer(new SelectPaymentDeferred_1.SelectPaymentDeferred(player, cashDue, { afterPay: () => {
                    player.addResource(this.tradeResource, unitsEarned, { log: true });
                } }));
            return undefined;
        }, 1, limit);
    }
    getSellingOption(player) {
        const terms = this.sellingTerms;
        if (terms.from !== 1) {
            throw new Error('selling from !== 1 not yet supported.');
        }
        let limit = player.getResource(this.tradeResource);
        limit = Math.min(limit, terms.limit);
        return new SelectAmount_1.SelectAmount(`Select a number of trades (${terms.from} ${this.tradeResource} => ${terms.to} M€, max ${limit})`, `Sell ${this.tradeResource}`, (unitsSold) => {
            const cashEarned = unitsSold * terms.to;
            player.addResource(Resource_1.Resource.MEGACREDITS, cashEarned);
            player.deductResource(this.tradeResource, unitsSold);
            player.game.log('${0} sold ${1} ${2}', (b) => b.player(player).number(unitsSold).string(this.tradeResource));
            return undefined;
        }, 1, limit);
    }
}
exports.MarketCard = MarketCard;
