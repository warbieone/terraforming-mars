"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gyropolis = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
const Options_1 = require("../Options");
class Gyropolis extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.GYROPOLIS,
            type: CardType_1.CardType.AUTOMATED,
            tags: [Tag_1.Tag.CITY, Tag_1.Tag.BUILDING],
            cost: 20,
            behavior: {
                city: {},
                production: { energy: -2, megacredits: { tag: [Tag_1.Tag.VENUS, Tag_1.Tag.EARTH] } },
            },
            metadata: {
                cardNumber: '230',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => {
                        pb.minus().energy(2).br;
                        pb.plus().megacredits(1).slash().venus(1, { played: Options_1.played }).br;
                        pb.plus().megacredits(1).slash().earth(1, { played: Options_1.played }).br;
                    }).nbsp.city();
                }),
                description: 'Decrease your energy production 2 steps. Increase your M€ production 1 step for each Venus and Earth tag you have. Place a city tile.',
            },
        });
    }
}
exports.Gyropolis = Gyropolis;
