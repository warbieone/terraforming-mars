"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CopernicusTower = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const Resource_1 = require("../../../common/Resource");
const CardResource_1 = require("../../../common/CardResource");
const CardRenderer_1 = require("../render/CardRenderer");
const CardRequirements_1 = require("../requirements/CardRequirements");
const Size_1 = require("../../../common/cards/render/Size");
const ActionCard_1 = require("../ActionCard");
class CopernicusTower extends ActionCard_1.ActionCard {
    constructor() {
        super({
            name: CardName_1.CardName.COPERNICUS_TOWER,
            type: CardType_1.CardType.ACTIVE,
            tags: [Tag_1.Tag.SCIENCE, Tag_1.Tag.MOON],
            cost: 36,
            resourceType: CardResource_1.CardResource.SCIENCE,
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.production(Resource_1.Resource.TITANIUM, 2)),
            victoryPoints: { tag: Tag_1.Tag.MOON },
            action: {
                or: {
                    autoSelect: true,
                    behaviors: [
                        {
                            spend: { resourcesHere: 1 },
                            tr: 1,
                            title: 'Remove 1 science resource to increase TR 1 step',
                        },
                        {
                            addResources: 1,
                            title: 'Add 1 science resource to this card',
                        },
                    ],
                },
            },
            metadata: {
                cardNumber: 'M72',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.text('Requires you have 2 titanium production.', Size_1.Size.TINY, false, false).br;
                    b.action('Add 1 science resource here, or spend 1 science resource here to raise your TR 1 step.', (eb) => {
                        eb.empty().startAction.science(1).nbsp.slash().nbsp.science(1).arrow().tr(1);
                    });
                    b.br;
                    b.vpText('1 VP PER MOON TAG YOU HAVE.');
                }),
            },
        });
    }
}
exports.CopernicusTower = CopernicusTower;
//# sourceMappingURL=CopernicusTower.js.map