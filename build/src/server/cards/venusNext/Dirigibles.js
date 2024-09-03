"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dirigibles = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardResource_1 = require("../../../common/CardResource");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const ActionCard_1 = require("../ActionCard");
class Dirigibles extends ActionCard_1.ActionCard {
    constructor() {
        super({
            name: CardName_1.CardName.DIRIGIBLES,
            type: CardType_1.CardType.ACTIVE,
            tags: [Tag_1.Tag.VENUS],
            cost: 11,
            resourceType: CardResource_1.CardResource.FLOATER,
            action: {
                addResourcesToAnyCard: { count: 1, type: CardResource_1.CardResource.FLOATER, mustHaveCard: true },
            },
            metadata: {
                cardNumber: '222',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Add 1 floater to ANY card', (eb) => {
                        eb.empty().startAction.resource(CardResource_1.CardResource.FLOATER).asterix();
                    }).br;
                    b.effect('When playing a Venus tag, Floaters here may be used as payment, and are worth 3M€ each.', (eb) => {
                        eb.tag(Tag_1.Tag.VENUS).startEffect.resource(CardResource_1.CardResource.FLOATER).equals().megacredits(3);
                    });
                }),
            },
        });
    }
}
exports.Dirigibles = Dirigibles;
