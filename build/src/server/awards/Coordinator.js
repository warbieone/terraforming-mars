"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coordinator = void 0;
const CardType_1 = require("../../common/cards/CardType");
class Coordinator {
    constructor() {
        this.name = 'Coordinator';
        this.description = 'Having the most event cards in play';
    }
    getScore(player) {
        return player.getCardsByCardType(CardType_1.CardType.EVENT).length;
    }
}
exports.Coordinator = Coordinator;
