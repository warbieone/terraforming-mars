"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = exports.isPayment = exports.PAYMENT_KEYS = void 0;
exports.PAYMENT_KEYS = ['heat', 'megaCredits', 'steel', 'titanium', 'microbes', 'floaters', 'science', 'seeds', 'data'];
function isPayment(obj) {
    if (typeof obj !== 'object')
        return false;
    if (!obj)
        return false;
    const h = obj;
    return exports.PAYMENT_KEYS.every((key) => h.hasOwnProperty(key) && typeof h[key] === 'number' && !isNaN(h[key]));
}
exports.isPayment = isPayment;
var Payment;
(function (Payment) {
    Payment.EMPTY = {
        heat: 0, megaCredits: 0, steel: 0, titanium: 0, microbes: 0, floaters: 0, science: 0, seeds: 0, data: 0,
    };
    function of(payment) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        return {
            data: (_a = payment.data) !== null && _a !== void 0 ? _a : 0,
            floaters: (_b = payment.floaters) !== null && _b !== void 0 ? _b : 0,
            heat: (_c = payment.heat) !== null && _c !== void 0 ? _c : 0,
            megaCredits: (_d = payment.megaCredits) !== null && _d !== void 0 ? _d : 0,
            microbes: (_e = payment.microbes) !== null && _e !== void 0 ? _e : 0,
            science: (_f = payment.science) !== null && _f !== void 0 ? _f : 0,
            seeds: (_g = payment.seeds) !== null && _g !== void 0 ? _g : 0,
            steel: (_h = payment.steel) !== null && _h !== void 0 ? _h : 0,
            titanium: (_j = payment.titanium) !== null && _j !== void 0 ? _j : 0,
        };
    }
    Payment.of = of;
})(Payment = exports.Payment || (exports.Payment = {}));
