"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrandLunaAcademy = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
const Options_1 = require("../Options");
class GrandLunaAcademy extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.GRAND_LUNA_ACADEMY,
            type: CardType_1.CardType.AUTOMATED,
            tags: [Tag_1.Tag.MOON],
            cost: 13,
            behavior: {
                drawCard: { count: { tag: Tag_1.Tag.MOON, per: 2 } },
            },
            metadata: {
                description: 'Draw 1 card per 2 Moon tags you have, including this.',
                cardNumber: 'M83',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.cards(1).slash().moon(2, { digit: Options_1.digit, played: Options_1.played });
                }),
            },
        });
    }
}
exports.GrandLunaAcademy = GrandLunaAcademy;
