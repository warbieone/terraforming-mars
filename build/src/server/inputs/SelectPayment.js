"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectPayment = void 0;
const PlayerInput_1 = require("../PlayerInput");
const PlayerInputType_1 = require("../../common/input/PlayerInputType");
const Payment_1 = require("../../common/inputs/Payment");
const InputResponse_1 = require("../../common/inputs/InputResponse");
class SelectPayment extends PlayerInput_1.BasePlayerInput {
    constructor(title, canUseSteel, canUseTitanium, canUseHeat, canUseSeeds, canUseData, canUseLunaTradeFederationTitanium, amount, cb) {
        super(PlayerInputType_1.PlayerInputType.SELECT_PAYMENT, title);
        this.canUseSteel = canUseSteel;
        this.canUseTitanium = canUseTitanium;
        this.canUseHeat = canUseHeat;
        this.canUseSeeds = canUseSeeds;
        this.canUseData = canUseData;
        this.canUseLunaTradeFederationTitanium = canUseLunaTradeFederationTitanium;
        this.amount = amount;
        this.cb = cb;
        this.buttonLabel = 'Pay';
    }
    process(input, player) {
        if (!(0, InputResponse_1.isSelectPaymentResponse)(input)) {
            throw new Error('Not a valid SelectPaymentResponse');
        }
        if (!(0, Payment_1.isPayment)(input.payment)) {
            throw new Error('payment is not a valid type');
        }
        if (!player.canSpend(input.payment)) {
            throw new Error('You do not have that many resources');
        }
        return this.cb(input.payment);
    }
}
exports.SelectPayment = SelectPayment;
