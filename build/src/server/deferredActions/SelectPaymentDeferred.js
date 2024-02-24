"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectPaymentDeferred = void 0;
const SelectPayment_1 = require("../inputs/SelectPayment");
const Payment_1 = require("../../common/inputs/Payment");
const DeferredAction_1 = require("./DeferredAction");
const CardName_1 = require("../../common/cards/CardName");
const MessageBuilder_1 = require("../logs/MessageBuilder");
class SelectPaymentDeferred extends DeferredAction_1.DeferredAction {
    constructor(player, amount, options = {}) {
        super(player, DeferredAction_1.Priority.DEFAULT);
        this.amount = amount;
        this.options = options;
    }
    mustPayWithMegacredits() {
        if (this.player.canUseHeatAsMegaCredits && this.player.availableHeat() > 0) {
            return false;
        }
        if (this.options.canUseSteel && this.player.steel > 0) {
            return false;
        }
        if (this.options.canUseTitanium && this.player.titanium > 0) {
            return false;
        }
        if (this.options.canUseGraphene && this.player.resourcesOnCard(CardName_1.CardName.CARBON_NANOSYSTEMS) > 0) {
            return false;
        }
        if (this.options.canUseAsteroids && this.player.resourcesOnCard(CardName_1.CardName.KUIPER_COOPERATIVE) > 0) {
            return false;
        }
        if (this.player.isCorporation(CardName_1.CardName.LUNA_TRADE_FEDERATION) && this.player.titanium > 0) {
            return false;
        }
        if (this.options.canUseSeeds && (this.player.resourcesOnCard(CardName_1.CardName.SOYLENT_SEEDLING_SYSTEMS) > 0)) {
            return false;
        }
        if (this.options.canUseAuroraiData && (this.player.resourcesOnCard(CardName_1.CardName.AURORAI) > 0)) {
            return false;
        }
        if (this.options.canUseSpireScience && (this.player.resourcesOnCard(CardName_1.CardName.SPIRE) > 0)) {
            return false;
        }
        return true;
    }
    execute() {
        if (this.mustPayWithMegacredits()) {
            if (this.player.megaCredits < this.amount) {
                throw new Error(`Player does not have ${this.amount} M€`);
            }
            const payment = Payment_1.Payment.of({ megaCredits: this.amount });
            this.player.pay(payment);
            this.cb(payment);
            return undefined;
        }
        return new SelectPayment_1.SelectPayment(this.options.title || (0, MessageBuilder_1.message)('Select how to spend ${0} M€', (b) => b.number(this.amount)), this.amount, {
            steel: this.options.canUseSteel || false,
            titanium: this.options.canUseTitanium || false,
            heat: this.player.canUseHeatAsMegaCredits,
            seeds: this.options.canUseSeeds || false,
            auroraiData: this.options.canUseAuroraiData || false,
            spireScience: this.options.canUseSpireScience || false,
            lunaTradeFederationTitanium: this.player.canUseTitaniumAsMegacredits,
            kuiperAsteroids: this.options.canUseAsteroids || false,
        })
            .andThen((payment) => {
            this.player.pay(payment);
            this.cb(payment);
            return undefined;
        });
    }
}
exports.SelectPaymentDeferred = SelectPaymentDeferred;
