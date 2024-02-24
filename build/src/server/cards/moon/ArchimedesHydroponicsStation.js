"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArchimedesHydroponicsStation = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
class ArchimedesHydroponicsStation extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.ARCHIMEDES_HYDROPONICS_STATION,
            type: CardType_1.CardType.AUTOMATED,
            tags: [Tag_1.Tag.PLANT],
            cost: 12,
            behavior: {
                production: { energy: -1, megacredits: -1, plants: 2 },
            },
            metadata: {
                description: 'Decrease your energy production 1 step and your M€ production 1 step. Increase your plant production 2 steps.',
                cardNumber: 'M27',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.minus().energy(1).megacredits(1).nbsp.plus().plants(2));
                }),
            },
        });
    }
}
exports.ArchimedesHydroponicsStation = ArchimedesHydroponicsStation;
