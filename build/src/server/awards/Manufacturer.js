"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Manufacturer = void 0;
const CardType_1 = require("../../common/cards/CardType");
class Manufacturer {
    constructor() {
        this.name = 'Manufacturer';
        this.description = 'Having the most active (blue) cards in play';
    }
    getScore(player) {
        return player.playedCards.filter((card) => card.type === CardType_1.CardType.ACTIVE).length;
    }
}
exports.Manufacturer = Manufacturer;
