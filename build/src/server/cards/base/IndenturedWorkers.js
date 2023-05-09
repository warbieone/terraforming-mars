"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndenturedWorkers = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
class IndenturedWorkers extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.EVENT,
            name: CardName_1.CardName.INDENTURED_WORKERS,
            cost: 0,
            victoryPoints: -1,
            metadata: {
                cardNumber: '195',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.text('next card', Size_1.Size.SMALL, true).colon().megacredits(-8);
                }),
                description: 'The next card you play this generation costs 8 M€ less.',
            },
        });
    }
    getCardDiscount(player) {
        if (player.lastCardPlayed === this.name) {
            return 8;
        }
        return 0;
    }
}
exports.IndenturedWorkers = IndenturedWorkers;
