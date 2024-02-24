"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalShading = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardResource_1 = require("../../../common/CardResource");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const ActionCard_1 = require("../ActionCard");
class LocalShading extends ActionCard_1.ActionCard {
    constructor() {
        super({
            name: CardName_1.CardName.LOCAL_SHADING,
            type: CardType_1.CardType.ACTIVE,
            tags: [Tag_1.Tag.VENUS],
            cost: 4,
            resourceType: CardResource_1.CardResource.FLOATER,
            action: {
                or: {
                    behaviors: [
                        {
                            spend: { resourcesHere: 1 },
                            production: { megacredits: 1 },
                            title: 'Remove 1 floater to increase M€ production 1 step',
                        },
                        {
                            addResources: 1,
                            title: 'Add 1 floater to this card',
                        },
                    ],
                    autoSelect: true,
                },
            },
            metadata: {
                cardNumber: '235',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Add 1 floater to this card.', (eb) => {
                        eb.empty().startAction.floaters(1);
                    }).br;
                    b.or().br;
                    b.action('Spend 1 floater here to raise your M€ production 1 step.', (eb) => {
                        eb.floaters(1).startAction.production((pb) => pb.megacredits(1));
                    });
                }),
            },
        });
    }
}
exports.LocalShading = LocalShading;
