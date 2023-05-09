"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrivateSecurity = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Tag_1 = require("../../../common/cards/Tag");
const Size_1 = require("../../../common/cards/render/Size");
class PrivateSecurity extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.PRIVATE_SECURITY,
            cost: 8,
            tags: [Tag_1.Tag.EARTH],
            metadata: {
                cardNumber: 'Pf25',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.text('Opponents may not remove your basic resource production', Size_1.Size.SMALL, true).br;
                    b.production((pb) => pb.wild(1, { cancelled: true }));
                }),
            },
        });
    }
}
exports.PrivateSecurity = PrivateSecurity;
