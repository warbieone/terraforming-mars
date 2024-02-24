"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardRenderSymbol = void 0;
const CardRenderSymbolType_1 = require("../../../common/cards/render/CardRenderSymbolType");
const Size_1 = require("../../../common/cards/render/Size");
class CardRenderSymbol {
    constructor(type, size, isIcon = false) {
        this.type = type;
        this.size = size;
        this.isIcon = isIcon;
        this.is = 'symbol';
    }
    static asterix(size = Size_1.Size.MEDIUM) {
        return new CardRenderSymbol(CardRenderSymbolType_1.CardRenderSymbolType.ASTERIX, size);
    }
    static or(size = Size_1.Size.MEDIUM) {
        return new CardRenderSymbol(CardRenderSymbolType_1.CardRenderSymbolType.OR, size);
    }
    static plus(size = Size_1.Size.MEDIUM) {
        return new CardRenderSymbol(CardRenderSymbolType_1.CardRenderSymbolType.PLUS, size, true);
    }
    static minus(size = Size_1.Size.MEDIUM) {
        return new CardRenderSymbol(CardRenderSymbolType_1.CardRenderSymbolType.MINUS, size, true);
    }
    static empty(size = Size_1.Size.MEDIUM) {
        return new CardRenderSymbol(CardRenderSymbolType_1.CardRenderSymbolType.EMPTY, size);
    }
    static slash(size = Size_1.Size.MEDIUM) {
        return new CardRenderSymbol(CardRenderSymbolType_1.CardRenderSymbolType.SLASH, size);
    }
    static colon(size = Size_1.Size.MEDIUM) {
        return new CardRenderSymbol(CardRenderSymbolType_1.CardRenderSymbolType.COLON, size);
    }
    static arrow(size = Size_1.Size.MEDIUM) {
        return new CardRenderSymbol(CardRenderSymbolType_1.CardRenderSymbolType.ARROW, size, true);
    }
    static bracketOpen(size = Size_1.Size.MEDIUM) {
        return new CardRenderSymbol(CardRenderSymbolType_1.CardRenderSymbolType.BRACKET_OPEN, size);
    }
    static bracketClose(size = Size_1.Size.MEDIUM) {
        return new CardRenderSymbol(CardRenderSymbolType_1.CardRenderSymbolType.BRACKET_CLOSE, size);
    }
    static nbsp(size = Size_1.Size.MEDIUM) {
        return new CardRenderSymbol(CardRenderSymbolType_1.CardRenderSymbolType.NBSP, size, true);
    }
    static vSpace(size = Size_1.Size.MEDIUM) {
        return new CardRenderSymbol(CardRenderSymbolType_1.CardRenderSymbolType.VSPACE, size, true);
    }
    static equals(size = Size_1.Size.MEDIUM) {
        return new CardRenderSymbol(CardRenderSymbolType_1.CardRenderSymbolType.EQUALS, size);
    }
    static surveyMission() {
        return new CardRenderSymbol(CardRenderSymbolType_1.CardRenderSymbolType.SURVEY_MISSION, Size_1.Size.MEDIUM, true);
    }
}
exports.CardRenderSymbol = CardRenderSymbol;
