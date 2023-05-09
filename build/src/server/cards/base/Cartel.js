"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cartel = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class Cartel extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.CARTEL,
            tags: [Tag_1.Tag.EARTH],
            cost: 8,
            behavior: {
                production: { megacredits: { tag: Tag_1.Tag.EARTH } },
            },
            metadata: {
                cardNumber: '137',
                description: 'Increase your M€ production 1 step for each Earth tag you have, including this.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => b.production((pb) => {
                    pb.megacredits(1).slash().earth(1, { played: Options_1.played });
                })),
            },
        });
    }
}
exports.Cartel = Cartel;
