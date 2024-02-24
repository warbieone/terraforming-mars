"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImmigrationShuttles = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class ImmigrationShuttles extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.IMMIGRATION_SHUTTLES,
            tags: [Tag_1.Tag.EARTH, Tag_1.Tag.SPACE],
            cost: 31,
            victoryPoints: { cities: {}, all: true, per: 3 },
            behavior: {
                production: { megacredits: 5 },
            },
            metadata: {
                cardNumber: '198',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.megacredits(5)).br;
                    b.vpText('1 VP for every 3rd City in play.');
                }),
                description: 'Increase your M€ production 5 steps.',
            },
        });
    }
}
exports.ImmigrationShuttles = ImmigrationShuttles;
