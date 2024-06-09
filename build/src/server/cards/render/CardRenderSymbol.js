"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardRenderSymbol = void 0;
const CardRenderSymbolType_1 = require("../../../common/cards/render/CardRenderSymbolType");
const Size_1 = require("../../../common/cards/render/Size");
class CardRenderSymbol {
    constructor(type, options) {
        this.is = 'symbol';
        this.type = type;
        this.size = options.size ?? Size_1.Size.MEDIUM;
        this.isIcon = options.isIcon ?? false;
        this.isSuperscript = options.isSuperscript ?? false;
    }
    static asterix(size) {
        return new CardRenderSymbol(CardRenderSymbolType_1.CardRenderSymbolType.ASTERIX, { size });
    }
    static or(size) {
        return new CardRenderSymbol(CardRenderSymbolType_1.CardRenderSymbolType.OR, { size });
    }
    static plus(size) {
        return new CardRenderSymbol(CardRenderSymbolType_1.CardRenderSymbolType.PLUS, { size, isIcon: true });
    }
    static minus(size) {
        return new CardRenderSymbol(CardRenderSymbolType_1.CardRenderSymbolType.MINUS, { size, isIcon: true });
    }
    static empty(size) {
        return new CardRenderSymbol(CardRenderSymbolType_1.CardRenderSymbolType.EMPTY, { size });
    }
    static slash(size) {
        return new CardRenderSymbol(CardRenderSymbolType_1.CardRenderSymbolType.SLASH, { size });
    }
    static colon(size) {
        return new CardRenderSymbol(CardRenderSymbolType_1.CardRenderSymbolType.COLON, { size });
    }
    static arrow(size) {
        return new CardRenderSymbol(CardRenderSymbolType_1.CardRenderSymbolType.ARROW, { size, isIcon: true });
    }
    static bracketOpen() {
        return new CardRenderSymbol(CardRenderSymbolType_1.CardRenderSymbolType.BRACKET_OPEN, { isSuperscript: true });
    }
    static bracketClose() {
        return new CardRenderSymbol(CardRenderSymbolType_1.CardRenderSymbolType.BRACKET_CLOSE, { isSuperscript: true });
    }
    static nbsp(size) {
        return new CardRenderSymbol(CardRenderSymbolType_1.CardRenderSymbolType.NBSP, { size, isIcon: true });
    }
    static vSpace(size) {
        return new CardRenderSymbol(CardRenderSymbolType_1.CardRenderSymbolType.VSPACE, { size, isIcon: true });
    }
    static equals(size) {
        return new CardRenderSymbol(CardRenderSymbolType_1.CardRenderSymbolType.EQUALS, { size });
    }
    static surveyMission() {
        return new CardRenderSymbol(CardRenderSymbolType_1.CardRenderSymbolType.SURVEY_MISSION, { isIcon: true });
    }
}
exports.CardRenderSymbol = CardRenderSymbol;
