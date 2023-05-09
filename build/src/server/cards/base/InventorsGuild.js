"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventorsGuild = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const ActionCard_1 = require("../ActionCard");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
class InventorsGuild extends ActionCard_1.ActionCard {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.INVENTORS_GUILD,
            tags: [Tag_1.Tag.SCIENCE],
            cost: 9,
            action: {
                drawCard: { count: 1, pay: true },
            },
            metadata: {
                cardNumber: '006',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action(undefined, (eb) => eb.empty().startAction.empty()).text('Action: Look at the top card and either buy it or discard it', Size_1.Size.SMALL, true);
                }),
            },
        });
    }
}
exports.InventorsGuild = InventorsGuild;
