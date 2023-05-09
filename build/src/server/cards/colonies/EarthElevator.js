"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EarthElevator = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const Card_1 = require("../Card");
const CardRenderer_1 = require("../render/CardRenderer");
class EarthElevator extends Card_1.Card {
    constructor() {
        super({
            cost: 43,
            tags: [Tag_1.Tag.SPACE, Tag_1.Tag.EARTH],
            name: CardName_1.CardName.EARTH_ELEVATOR,
            type: CardType_1.CardType.AUTOMATED,
            victoryPoints: 4,
            behavior: {
                production: { titanium: 3 },
            },
            metadata: {
                description: 'Increase your titanium production 3 steps.',
                cardNumber: 'C08',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.titanium(3));
                }),
            },
        });
    }
}
exports.EarthElevator = EarthElevator;
