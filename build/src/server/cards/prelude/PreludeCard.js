"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreludeCard = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
class PreludeCard extends Card_1.Card {
    constructor(properties) {
        var _a, _b, _c;
        const startingMegaCredits = (_a = properties.startingMegacredits) !== null && _a !== void 0 ? _a : (_c = (_b = properties.behavior) === null || _b === void 0 ? void 0 : _b.stock) === null || _c === void 0 ? void 0 : _c.megacredits;
        if (typeof (startingMegaCredits) === 'object') {
            throw new Error('Cannot have a Countable for a Prelude stock MC: ' + properties.name);
        }
        const obj = {
            behavior: properties.behavior,
            type: CardType_1.CardType.PRELUDE,
            name: properties.name,
            tags: properties.tags,
            metadata: properties.metadata,
        };
        if (startingMegaCredits !== undefined) {
            obj.startingMegaCredits = startingMegaCredits;
        }
        super(obj);
    }
    get type() {
        return CardType_1.CardType.PRELUDE;
    }
}
exports.PreludeCard = PreludeCard;
