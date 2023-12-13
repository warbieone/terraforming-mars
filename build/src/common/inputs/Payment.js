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
    };
    function of(payment) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        return {
            auroraiData: (_a = payment.auroraiData) !== null && _a !== void 0 ? _a : 0,
            floaters: (_b = payment.floaters) !== null && _b !== void 0 ? _b : 0,
            heat: (_c = payment.heat) !== null && _c !== void 0 ? _c : 0,
            lunaArchivesScience: (_d = payment.lunaArchivesScience) !== null && _d !== void 0 ? _d : 0,
            spireScience: (_e = payment.spireScience) !== null && _e !== void 0 ? _e : 0,
            megaCredits: (_f = payment.megaCredits) !== null && _f !== void 0 ? _f : 0,
            microbes: (_g = payment.microbes) !== null && _g !== void 0 ? _g : 0,
            seeds: (_h = payment.seeds) !== null && _h !== void 0 ? _h : 0,
            steel: (_j = payment.steel) !== null && _j !== void 0 ? _j : 0,
            titanium: (_k = payment.titanium) !== null && _k !== void 0 ? _k : 0,
            graphene: (_l = payment.graphene) !== null && _l !== void 0 ? _l : 0,
            kuiperAsteroids: (_m = payment.kuiperAsteroids) !== null && _m !== void 0 ? _m : 0,
            plants: (_o = payment.plants) !== null && _o !== void 0 ? _o : 0,
        };
    }
    Payment.of = of;
})(Payment = exports.Payment || (exports.Payment = {}));
//# sourceMappingURL=Payment.js.map