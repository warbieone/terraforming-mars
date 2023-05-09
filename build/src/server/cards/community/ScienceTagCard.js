"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScienceTagCard = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
class ScienceTagCard {
    get cost() {
        return 0;
    }
    get tags() {
        return [Tag_1.Tag.SCIENCE];
    }
    get name() {
        return CardName_1.CardName.SCIENCE_TAG_BLANK_CARD;
    }
    get cardType() {
        return CardType_1.CardType.PROXY;
    }
    get type() {
        return CardType_1.CardType.PROXY;
    }
    canPlay() {
        return false;
    }
    get metadata() {
        throw new Error('ScienceTagCard is a proxy card, not a real card. Should not render');
    }
    play() {
        return undefined;
    }
    get resourceCount() {
        return 0;
    }
    getVictoryPoints() {
        return 0;
    }
}
exports.ScienceTagCard = ScienceTagCard;
