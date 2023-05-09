"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrbitalPowerGrid = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
const Options_1 = require("../Options");
class OrbitalPowerGrid extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.ORBITAL_POWER_GRID,
            type: CardType_1.CardType.AUTOMATED,
            tags: [Tag_1.Tag.POWER, Tag_1.Tag.SPACE],
            cost: 19,
            victoryPoints: 1,
            behavior: {
                production: { energy: { cities: { where: 'offmars' } } },
            },
            metadata: {
                description: 'Increase your energy production 1 step per city tile NOT ON MARS.',
                cardNumber: 'M85',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.energy(1)).slash().city({ all: Options_1.all, secondaryTag: Tag_1.Tag.SPACE });
                }),
            },
        });
    }
}
exports.OrbitalPowerGrid = OrbitalPowerGrid;
