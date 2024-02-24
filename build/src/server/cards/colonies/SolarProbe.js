"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolarProbe = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
const Options_1 = require("../Options");
class SolarProbe extends Card_1.Card {
    constructor() {
        super({
            cost: 9,
            tags: [Tag_1.Tag.SPACE, Tag_1.Tag.SCIENCE],
            name: CardName_1.CardName.SOLAR_PROBE,
            type: CardType_1.CardType.EVENT,
            victoryPoints: 1,
            behavior: {
                drawCard: { count: { tag: Tag_1.Tag.SCIENCE, per: 3 } },
            },
            metadata: {
                cardNumber: 'C37',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.cards(1).slash().science(3, { digit: Options_1.digit, played: Options_1.played });
                }),
                description: 'Draw 1 card for every 3 science tags you have, including this.',
            },
        });
    }
}
exports.SolarProbe = SolarProbe;
