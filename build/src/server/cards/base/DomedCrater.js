"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomedCrater = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class DomedCrater extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.DOMED_CRATER,
            tags: [Tag_1.Tag.CITY, Tag_1.Tag.BUILDING],
            cost: 24,
            victoryPoints: 1,
            behavior: {
                production: { energy: -1, megacredits: 3 },
                stock: { plants: 3 },
                city: {},
            },
            requirements: { oxygen: 7, max: Options_1.max },
            metadata: {
                cardNumber: 'T03',
                description: {
                    text: 'Oxygen must be 7% or less. Gain 3 plants. Place a city tile. Decrease your energy production 1 step and increase your M€ production 3 steps.',
                    align: 'left',
                },
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => {
                        pb.minus().energy(1).br;
                        pb.plus().megacredits(3);
                    }).nbsp.city().plants(3, { digit: Options_1.digit }).br;
                }),
            },
        });
    }
}
exports.DomedCrater = DomedCrater;
