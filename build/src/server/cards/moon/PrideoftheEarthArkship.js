"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrideoftheEarthArkship = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardResource_1 = require("../../../common/CardResource");
const CardRenderer_1 = require("../render/CardRenderer");
const ActionCard_1 = require("../ActionCard");
const CardRequirements_1 = require("../CardRequirements");
const Options_1 = require("../Options");
class PrideoftheEarthArkship extends ActionCard_1.ActionCard {
    constructor() {
        super({
            name: CardName_1.CardName.PRIDE_OF_THE_EARTH_ARKSHIP,
            type: CardType_1.CardType.ACTIVE,
            tags: [Tag_1.Tag.SCIENCE, Tag_1.Tag.SCIENCE, Tag_1.Tag.SPACE],
            cost: 22,
            resourceType: CardResource_1.CardResource.SCIENCE,
            victoryPoints: { resourcesHere: {} },
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.tag(Tag_1.Tag.SCIENCE).tag(Tag_1.Tag.SPACE, 2)),
            reserveUnits: { titanium: 2 },
            action: {
                addResources: { tag: Tag_1.Tag.SCIENCE, per: 5 },
            },
            metadata: {
                description: 'Requires 1 science and 2 space tags. Spend 2 titanium. 1 VP per science resource here.',
                cardNumber: 'M24',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Add 1 science resource here per every 5 science tags you have.', (eb) => {
                        eb.empty().startAction.science(1).slash().text('5').science(1, { played: Options_1.played });
                    }).br;
                    b.minus().titanium(2);
                }),
            },
        });
    }
}
exports.PrideoftheEarthArkship = PrideoftheEarthArkship;
//# sourceMappingURL=PrideoftheEarthArkship.js.map