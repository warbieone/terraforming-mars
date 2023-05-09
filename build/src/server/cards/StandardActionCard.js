"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StandardActionCard = void 0;
const CardType_1 = require("../../common/cards/CardType");
const Card_1 = require("./Card");
class StandardActionCard extends Card_1.Card {
    constructor(properties) {
        super(Object.assign({ type: CardType_1.CardType.STANDARD_ACTION }, properties));
    }
    get type() {
        return CardType_1.CardType.STANDARD_ACTION;
    }
    actionUsed(player) {
        player.game.log('${0} used ${1} standard action', (b) => b.player(player).card(this));
    }
}
exports.StandardActionCard = StandardActionCard;
