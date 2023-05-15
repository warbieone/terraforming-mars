"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Livestock = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const ActionCard_1 = require("../ActionCard");
const CardType_1 = require("../../../common/cards/CardType");
const CardResource_1 = require("../../../common/CardResource");
const CardName_1 = require("../../../common/cards/CardName");
const CardRequirements_1 = require("../CardRequirements");
const CardRenderer_1 = require("../render/CardRenderer");
class Livestock extends ActionCard_1.ActionCard {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.LIVESTOCK,
            tags: [Tag_1.Tag.ANIMAL],
            cost: 13,
            resourceType: CardResource_1.CardResource.ANIMAL,
            victoryPoints: { resourcesHere: {} },
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.oxygen(9)),
            behavior: {
                production: { plants: -1, megacredits: 2 },
            },
            action: {
                addResources: 1,
            },
            metadata: {
                cardNumber: '184',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Add 1 animal to this card.', (eb) => {
                        eb.empty().startAction.animals(1);
                    }).br;
                    b.production((pb) => {
                        pb.minus().plants(1).nbsp.plus().megacredits(2);
                    }).br;
                    b.vpText('1 VP for each animal on this card.');
                }),
                description: {
                    text: 'Requires 9% oxygen. Decrease your plant production 1 step and increase your M€ production 2 steps',
                    align: 'left',
                },
            },
        });
    }
}
exports.Livestock = Livestock;
//# sourceMappingURL=Livestock.js.map