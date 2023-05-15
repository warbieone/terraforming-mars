"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectPaymentDeferred = void 0;
const SelectPayment_1 = require("../inputs/SelectPayment");
const DeferredAction_1 = require("./DeferredAction");
const Resource_1 = require("../../common/Resource");
const CardName_1 = require("../../common/cards/CardName");
class SelectPaymentDeferred extends DeferredAction_1.DeferredAction {
    constructor(player, amount, options = {}) {
        super(player, DeferredAction_1.Priority.DEFAULT);
        this.amount = amount;
        this.options = options;
    }
    mustPayWithMegacredits() {
        var _a, _b, _c, _d;
        if (this.player.canUseHeatAsMegaCredits && this.player.availableHeat() > 0) {
            return false;
        }
        if (this.options.canUseSteel && this.player.steel > 0) {
            return false;
        }
        if (this.options.canUseTitanium && this.player.titanium > 0) {
            return false;
        }
        if (this.player.isCorporation(CardName_1.CardName.LUNA_TRADE_FEDERATION) && this.player.titanium > 0) {
            return false;
        }
        if (this.options.canUseSeeds && ((_b = (_a = this.player.getCorporation(CardName_1.CardName.SOYLENT_SEEDLING_SYSTEMS)) === null || _a === void 0 ? void 0 : _a.resourceCount) !== null && _b !== void 0 ? _b : 0) > 0) {
            return false;
        }
        if (this.options.canUseData && ((_d = (_c = this.player.getCorporation(CardName_1.CardName.AURORAI)) === null || _c === void 0 ? void 0 : _c.resourceCount) !== null && _d !== void 0 ? _d : 0) > 0) {
            return false;
        }
        return true;
    }
    execute() {
        var _a, _b;
        if (this.mustPayWithMegacredits()) {
            if (this.player.megaCredits < this.amount) {
                throw new Error(`Player does not have ${this.amount} M€`);
            }
            this.player.deductResource(Resource_1.Resource.MEGACREDITS, this.amount);
            (_b = (_a = this.options).afterPay) === null || _b === void 0 ? void 0 : _b.call(_a);
            return undefined;
        }
        return new SelectPayment_1.SelectPayment(this.options.title || 'Select how to spend ' + this.amount + ' M€', this.options.canUseSteel || false, this.options.canUseTitanium || false, this.player.canUseHeatAsMegaCredits, this.options.canUseSeeds || false, this.options.canUseData || false, this.player.canUseTitaniumAsMegacredits, this.amount, (payment) => {
            var _a, _b;
            if (!this.player.canSpend(payment)) {
                throw new Error('You do not have that many resources to spend');
            }
            const amountPaid = this.player.payingAmount(payment, {
                steel: this.options.canUseSteel,
                titanium: this.options.canUseTitanium,
                seeds: this.options.canUseSeeds,
                floaters: false,
                microbes: false,
                science: false,
                data: this.options.canUseData,
            });
            if (amountPaid < this.amount) {
                throw new Error('Did not spend enough');
            }
            this.player.pay(payment);
            (_b = (_a = this.options).afterPay) === null || _b === void 0 ? void 0 : _b.call(_a);
            return undefined;
        });
    }
}
exports.SelectPaymentDeferred = SelectPaymentDeferred;
//# sourceMappingURL=SelectPaymentDeferred.js.map