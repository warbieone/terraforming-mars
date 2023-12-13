"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScienceTagCard = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardName_1 = require("../../../common/cards/CardName");
const ProxyCard_1 = require("../ProxyCard");
class ScienceTagCard extends ProxyCard_1.ProxyCard {
    constructor() {
        super(CardName_1.CardName.SCIENCE_TAG_BLANK_CARD);
    }
    get tags() {
        return [Tag_1.Tag.SCIENCE];
    }
}
exports.ScienceTagCard = ScienceTagCard;
//# sourceMappingURL=ScienceTagCard.js.map