"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardRenderItem = void 0;
class CardRenderItem {
    constructor(type, amount = -1, options) {
        var _a;
        this.type = type;
        this.amount = amount;
        this.is = 'item';
        this.multiplier = false;
        this.clone = false;
        this.cancelled = false;
        this.questionMark = false;
        switch (options === null || options === void 0 ? void 0 : options.digit) {
            case true:
                this.showDigit = true;
                break;
            case false:
                break;
            default:
                this.showDigit = Math.abs(this.amount) > 5 ? true : undefined;
        }
        if (options === undefined) {
            return this;
        }
        this.size = options.size;
        if (options.amount !== undefined) {
            this.amount = options.amount;
        }
        this.anyPlayer = options.all;
        this.isPlayed = options.played;
        this.secondaryTag = options.secondaryTag;
        if (options.multiplier === true) {
            this.amountInside = true;
            this.multiplier = true;
        }
        if (options.clone === true) {
            this.amountInside = false;
            this.clone = true;
        }
        this.cancelled = (_a = options.cancelled) !== null && _a !== void 0 ? _a : false;
        this.over = options.over;
        this.questionMark = options.questionMark;
        return this;
    }
}
exports.CardRenderItem = CardRenderItem;
