"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProtectedValley = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class ProtectedValley extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.PROTECTED_VALLEY,
            tags: [Tag_1.Tag.PLANT, Tag_1.Tag.BUILDING],
            cost: 23,
            tr: { oxygen: 1 },
            behavior: {
                production: { megacredits: 2 },
                greenery: { on: 'ocean' },
            },
            metadata: {
                cardNumber: '174',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.megacredits(2)).nbsp;
                    b.greenery().asterix();
                }),
                description: 'Increase your M€ production 2 steps. Place a greenery tile ON AN AREA RESERVED FOR OCEAN, disregarding normal placement restrictions, and increase oxygen 1 step.',
            },
        });
    }
}
exports.ProtectedValley = ProtectedValley;
