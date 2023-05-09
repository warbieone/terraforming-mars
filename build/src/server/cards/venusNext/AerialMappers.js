"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AerialMappers = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardResource_1 = require("../../../common/CardResource");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
const ActionCard_1 = require("../ActionCard");
class AerialMappers extends ActionCard_1.ActionCard {
    constructor() {
        super({
            name: CardName_1.CardName.AERIAL_MAPPERS,
            type: CardType_1.CardType.ACTIVE,
            tags: [Tag_1.Tag.VENUS],
            cost: 11,
            resourceType: CardResource_1.CardResource.FLOATER,
            victoryPoints: 1,
            action: {
                or: {
                    autoSelect: true,
                    behaviors: [
                        {
                            spend: { resourcesHere: 1 },
                            drawCard: 1,
                            title: 'Remove 1 floater on this card and draw a card',
                        },
                        {
                            addResourcesToAnyCard: {
                                type: CardResource_1.CardResource.FLOATER,
                                count: 1,
                            },
                            title: 'Add 1 floater to this card',
                        },
                    ],
                },
            },
            metadata: {
                cardNumber: '213',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Add floater to ANY card.', (be) => {
                        be.empty().startAction.floaters(1).asterix();
                    }).br;
                    b.or(Size_1.Size.SMALL).br;
                    b.action('Spend one floater here to draw 1 card.', (be) => {
                        be.floaters(1).startAction.cards(1);
                    });
                }),
            },
        });
    }
}
exports.AerialMappers = AerialMappers;
