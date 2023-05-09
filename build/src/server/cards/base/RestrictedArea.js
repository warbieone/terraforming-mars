"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestrictedArea = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const ActionCard_1 = require("../ActionCard");
const CardType_1 = require("../../../common/cards/CardType");
const TileType_1 = require("../../../common/TileType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class RestrictedArea extends ActionCard_1.ActionCard {
    constructor(name = CardName_1.CardName.RESTRICTED_AREA, adjacencyBonus = undefined, metadata = {
        cardNumber: '199',
        renderData: CardRenderer_1.CardRenderer.builder((b) => {
            b.action('Spend 2 M€ to draw a card.', (eb) => {
                eb.megacredits(2).startAction.cards(1);
            }).br;
            b.tile(TileType_1.TileType.RESTRICTED_AREA, true);
        }),
        description: 'Place this tile.',
    }) {
        super({
            type: CardType_1.CardType.ACTIVE,
            name,
            tags: [Tag_1.Tag.SCIENCE],
            cost: 11,
            behavior: {
                tile: {
                    type: TileType_1.TileType.RESTRICTED_AREA,
                    on: 'land',
                    adjacencyBonus: adjacencyBonus,
                },
            },
            action: {
                spend: { megacredits: 2 },
                drawCard: 1,
            },
            metadata,
        });
    }
}
exports.RestrictedArea = RestrictedArea;
