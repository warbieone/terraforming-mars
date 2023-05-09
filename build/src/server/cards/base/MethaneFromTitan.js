"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MethaneFromTitan = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const CardRequirements_1 = require("../CardRequirements");
class MethaneFromTitan extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.METHANE_FROM_TITAN,
            tags: [Tag_1.Tag.JOVIAN, Tag_1.Tag.SPACE],
            cost: 28,
            victoryPoints: 2,
            behavior: {
                production: { heat: 2, plants: 2 },
            },
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.oxygen(2)),
            metadata: {
                description: 'Requires 2% oxygen. Increase your heat production 2 steps and your plant production 2 steps.',
                cardNumber: '018',
                renderData: CardRenderer_1.CardRenderer.builder((b) => b.production((pb) => {
                    pb.heat(2).br;
                    pb.plants(2);
                })),
            },
        });
    }
}
exports.MethaneFromTitan = MethaneFromTitan;
