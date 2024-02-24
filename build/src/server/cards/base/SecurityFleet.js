"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityFleet = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const ActionCard_1 = require("../ActionCard");
const CardType_1 = require("../../../common/cards/CardType");
const CardResource_1 = require("../../../common/CardResource");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class SecurityFleet extends ActionCard_1.ActionCard {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.SECURITY_FLEET,
            tags: [Tag_1.Tag.SPACE],
            cost: 12,
            resourceType: CardResource_1.CardResource.FIGHTER,
            victoryPoints: { resourcesHere: {} },
            action: {
                spend: { titanium: 1 },
                addResources: 1,
            },
            metadata: {
                cardNumber: '028',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Spend 1 titanium to add 1 fighter resource to this card.', (eb) => {
                        eb.titanium(1).startAction.fighter();
                    }).br;
                    b.vpText('1 VP for each fighter resource on this card.');
                }),
            },
        });
    }
}
exports.SecurityFleet = SecurityFleet;
