"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pollinators = void 0;
const ActionCard_1 = require("../ActionCard");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const CardResource_1 = require("../../../common/CardResource");
const Tag_1 = require("../../../common/cards/Tag");
const CardRequirements_1 = require("../requirements/CardRequirements");
class Pollinators extends ActionCard_1.ActionCard {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.POLLINATORS,
            cost: 19,
            tags: [Tag_1.Tag.PLANT, Tag_1.Tag.ANIMAL],
            resourceType: CardResource_1.CardResource.ANIMAL,
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.tag(Tag_1.Tag.PLANT, 3)),
            victoryPoints: { resourcesHere: {} },
            behavior: {
                production: { plants: 1, megacredits: 2 },
            },
            action: {
                addResources: 1,
            },
            metadata: {
                cardNumber: '...',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Add 1 animal on this card', (ab) => ab.empty().startAction.animals(1)).br;
                    b.production((pb) => pb.plants(1).megacredits(2));
                    b.vpText('1 VP per animal on this card.');
                }),
                description: 'Requires 3 plant tags. Raise your plant production 1 step and your M€ production 2 steps.',
            },
        });
    }
}
exports.Pollinators = Pollinators;
//# sourceMappingURL=Pollinators.js.map