"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HydrogenProcessingPlant = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Tag_1 = require("../../../common/cards/Tag");
const CardRequirements_1 = require("../CardRequirements");
class HydrogenProcessingPlant extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.HYDROGEN_PROCESSING_PLANT,
            cost: 9,
            tags: [Tag_1.Tag.BUILDING, Tag_1.Tag.POWER],
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.oxygen(3)),
            victoryPoints: -1,
            behavior: {
                global: { oxygen: -1 },
                production: { energy: { oceans: {}, per: 2 } },
            },
            metadata: {
                cardNumber: 'Pf19',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.energy(1)).slash().oceans(2).br;
                    b.minus().oxygen(1).br;
                }),
                description: 'Oxygen level must be 3% or higher. Decrease oxygen level 1% ' +
                    'Raise your energy production 1 step for every two ocean tiles on Mars.',
            },
        });
    }
}
exports.HydrogenProcessingPlant = HydrogenProcessingPlant;
