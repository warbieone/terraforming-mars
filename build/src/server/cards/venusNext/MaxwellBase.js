"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaxwellBase = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const SpaceName_1 = require("../../SpaceName");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const ActionCard_1 = require("../ActionCard");
class MaxwellBase extends ActionCard_1.ActionCard {
    constructor() {
        super({
            name: CardName_1.CardName.MAXWELL_BASE,
            type: CardType_1.CardType.ACTIVE,
            tags: [Tag_1.Tag.CITY, Tag_1.Tag.VENUS],
            cost: 18,
            action: {
                addResourcesToAnyCard: {
                    tag: Tag_1.Tag.VENUS,
                    count: 1,
                    autoSelect: true,
                    mustHaveCard: true,
                },
            },
            requirements: { venus: 12 },
            victoryPoints: 3,
            behavior: {
                production: { energy: -1 },
                city: { space: SpaceName_1.SpaceName.MAXWELL_BASE },
            },
            metadata: {
                cardNumber: '238',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Add 1 resource to ANOTHER VENUS CARD.', (eb) => {
                        eb.empty().startAction.wild(1, { secondaryTag: Tag_1.Tag.VENUS });
                    }).br;
                    b.production((pb) => pb.minus().energy(1)).nbsp.city().asterix();
                }),
                description: {
                    text: 'Requires Venus 12%. Decrease your energy production 1 step. Place a city tile ON THE RESERVED AREA.',
                    align: 'left',
                },
            },
        });
    }
}
exports.MaxwellBase = MaxwellBase;
//# sourceMappingURL=MaxwellBase.js.map