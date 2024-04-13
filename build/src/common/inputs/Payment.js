"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = exports.DEFAULT_PAYMENT_VALUES = exports.isPayment = void 0;
const constants_1 = require("../constants");
const Spendable_1 = require("./Spendable");
function isPayment(obj) {
    if (typeof obj !== 'object')
        return false;
    if (!obj)
        return false;
    const h = obj;
    return Spendable_1.SPENDABLE_RESOURCES.every((key) => h.hasOwnProperty(key) && typeof h[key] === 'number' && !isNaN(h[key]));
}
exports.isPayment = isPayment;
exports.DEFAULT_PAYMENT_VALUES = {
    megaCredits: 1,
    steel: 2,
    titanium: 3,
    heat: 1,
    plants: 3,
    microbes: constants_1.MICROBES_VALUE,
    floaters: constants_1.FLOATERS_VALUE,
    lunaArchivesScience: 1,
    spireScience: 2,
    seeds: constants_1.SEED_VALUE,
    auroraiData: constants_1.DATA_VALUE,
    graphene: constants_1.GRAPHENE_VALUE,
    kuiperAsteroids: 1,
    corruption: constants_1.CORRUPTION_VALUE,
};
var Payment;
(function (Payment) {
    Payment.EMPTY = {
        heat: 0,
        megaCredits: 0,
        steel: 0,
        titanium: 0,
        plants: 0,
        microbes: 0,
        floaters: 0,
        lunaArchivesScience: 0,
        spireScience: 0,
        seeds: 0,
        auroraiData: 0,
        graphene: 0,
        kuiperAsteroids: 0,
        corruption: 0,
    };
    function of(payment) {
        return {
            auroraiData: payment.auroraiData ?? 0,
            floaters: payment.floaters ?? 0,
            heat: payment.heat ?? 0,
            lunaArchivesScience: payment.lunaArchivesScience ?? 0,
            spireScience: payment.spireScience ?? 0,
            megaCredits: payment.megaCredits ?? 0,
            microbes: payment.microbes ?? 0,
            seeds: payment.seeds ?? 0,
            steel: payment.steel ?? 0,
            titanium: payment.titanium ?? 0,
            graphene: payment.graphene ?? 0,
            kuiperAsteroids: payment.kuiperAsteroids ?? 0,
            plants: payment.plants ?? 0,
            corruption: payment.corruption ?? 0,
        };
    }
    Payment.of = of;
})(Payment = exports.Payment || (exports.Payment = {}));
