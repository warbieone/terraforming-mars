"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CeoCard = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
class CeoCard extends Card_1.Card {
    constructor(properties) {
        super({
            type: CardType_1.CardType.CEO,
            name: properties.name,
            tags: properties.tags,
            metadata: properties.metadata,
        });
        this.isDisabled = false;
    }
    canAct(_player) {
        return this.isDisabled === false;
    }
    play(_player) {
        return undefined;
    }
    get type() {
        return CardType_1.CardType.CEO;
    }
}
exports.CeoCard = CeoCard;
//# sourceMappingURL=CeoCard.js.map