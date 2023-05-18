"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FloatingHabs = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardResource_1 = require("../../../common/CardResource");
const CardName_1 = require("../../../common/cards/CardName");
const CardRequirements_1 = require("../requirements/CardRequirements");
const CardRenderer_1 = require("../render/CardRenderer");
const ActionCard_1 = require("../ActionCard");
class FloatingHabs extends ActionCard_1.ActionCard {
    constructor() {
        super({
            name: CardName_1.CardName.FLOATING_HABS,
            type: CardType_1.CardType.ACTIVE,
            tags: [Tag_1.Tag.VENUS],
            cost: 5,
            resourceType: CardResource_1.CardResource.FLOATER,
            victoryPoints: { resourcesHere: {}, per: 2 },
            action: {
                spend: {
                    megacredits: 2,
                },
                addResourcesToAnyCard: { type: CardResource_1.CardResource.FLOATER, count: 1, autoSelect: true },
            },
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.tag(Tag_1.Tag.SCIENCE, 2)),
            metadata: {
                cardNumber: '225',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Spend 2 M€ to add 1 floater to ANY card', (eb) => {
                        eb.megacredits(2).startAction.floaters(1).asterix();
                    }).br;
                    b.vpText('1 VP for every 2nd Floater on this card.');
                }),
                description: 'Requires 2 science tags.',
            },
        });
    }
}
exports.FloatingHabs = FloatingHabs;
//# sourceMappingURL=FloatingHabs.js.map