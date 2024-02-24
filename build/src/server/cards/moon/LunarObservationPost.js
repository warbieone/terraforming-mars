"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LunarObservationPost = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardResource_1 = require("../../../common/CardResource");
const CardRenderer_1 = require("../render/CardRenderer");
const ActionCard_1 = require("../ActionCard");
class LunarObservationPost extends ActionCard_1.ActionCard {
    constructor() {
        super({
            name: CardName_1.CardName.LUNAR_OBSERVATION_POST,
            type: CardType_1.CardType.ACTIVE,
            tags: [Tag_1.Tag.SCIENCE, Tag_1.Tag.SCIENCE],
            cost: 7,
            resourceType: CardResource_1.CardResource.DATA,
            victoryPoints: { resourcesHere: {}, per: 3 },
            reserveUnits: { titanium: 1 },
            action: {
                addResourcesToAnyCard: { type: CardResource_1.CardResource.DATA, count: 1 },
            },
            metadata: {
                description: 'Spend 1 titanium. 1 VP for every 3 data resources here.',
                cardNumber: 'M22',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Add 1 data resource to ANY card', (ab) => {
                        ab.empty().startAction.data().asterix();
                    });
                    b.br;
                    b.minus().titanium(1);
                }),
            },
        });
    }
}
exports.LunarObservationPost = LunarObservationPost;
