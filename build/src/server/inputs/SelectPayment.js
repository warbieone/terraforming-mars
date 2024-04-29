"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectPayment = void 0;
const PlayerInput_1 = require("../PlayerInput");
const Payment_1 = require("../../common/inputs/Payment");
const InputResponse_1 = require("../../common/inputs/InputResponse");
const InputError_1 = require("./InputError");
class SelectPayment extends PlayerInput_1.BasePlayerInput {
    constructor(title, amount, paymentOptions) {
        super('payment', title);
        this.amount = amount;
        this.paymentOptions = paymentOptions;
        this.buttonLabel = 'Pay';
    }
    toModel(player) {
        return {
            title: this.title,
            buttonLabel: this.buttonLabel,
            type: 'payment',
            amount: this.amount,
            paymentOptions: {
                heat: player.canUseHeatAsMegaCredits,
                lunaTradeFederationTitanium: player.canUseTitaniumAsMegacredits,
                ...this.paymentOptions,
            },
            seeds: player.getSpendable('seeds'),
            auroraiData: player.getSpendable('auroraiData'),
            kuiperAsteroids: player.getSpendable('kuiperAsteroids'),
            spireScience: player.getSpendable('spireScience'),
        };
    }
    process(input, player) {
        if (!(0, InputResponse_1.isSelectPaymentResponse)(input)) {
            throw new InputError_1.InputError('Not a valid SelectPaymentResponse');
        }
        const payment = input.payment;
        if (!(0, Payment_1.isPayment)(payment)) {
            throw new InputError_1.InputError('payment is not a valid type');
        }
        if (!player.canSpend(payment)) {
            throw new InputError_1.InputError('You do not have that many resources');
        }
        if (!player.canSpend(payment)) {
            throw new InputError_1.InputError('You do not have that many resources to spend');
        }
        const amountPaid = player.payingAmount(payment, this.paymentOptions);
        if (amountPaid < this.amount) {
            throw new InputError_1.InputError('Did not spend enough');
        }
        return this.cb(input.payment);
    }
}
exports.SelectPayment = SelectPayment;
