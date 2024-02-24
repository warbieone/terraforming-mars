"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardRenderItem = void 0;
class CardRenderItem {
    constructor(type, amount = -1, options) {
        this.type = type;
        this.amount = amount;
        this.is = 'item';
        this.clone = false;
        this.cancelled = false;
        switch (options?.digit) {
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
        if (options.clone === true) {
            this.amountInside = false;
            this.clone = true;
        }
        this.cancelled = options.cancelled ?? false;
        this.over = options.over;
        if (options.text !== undefined) {
            this.innerText = options.text;
        }
        return this;
    }
}
exports.CardRenderItem = CardRenderItem;
