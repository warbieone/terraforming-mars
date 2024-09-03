"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardRenderItem = void 0;
class CardRenderItem {
    constructor(type, amount = -1, options) {
        this.type = type;
        this.amount = amount;
        this.is = 'item';
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
        if (options.superscript === true) {
            this.isSuperscript = true;
        }
        if (options.resource !== undefined) {
            this.resource = options.resource;
        }
        if (options.tag !== undefined) {
            this.tag = options.tag;
        }
        return this;
    }
}
exports.CardRenderItem = CardRenderItem;
