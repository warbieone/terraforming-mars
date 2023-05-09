"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HE3Lobbyists = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
class HE3Lobbyists extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.HE3_LOBBYISTS,
            type: CardType_1.CardType.AUTOMATED,
            tags: [Tag_1.Tag.MOON],
            cost: 7,
            behavior: {
                production: { megacredits: { tag: Tag_1.Tag.MOON } },
            },
            metadata: {
                description: 'Increase your M€ production 1 step for each Moon tag you have (including this).',
                cardNumber: 'M50',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.megacredits(1)).slash().moon();
                }),
            },
        });
    }
}
exports.HE3Lobbyists = HE3Lobbyists;
