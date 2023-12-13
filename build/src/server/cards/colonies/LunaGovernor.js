"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LunaGovernor = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const Card_1 = require("../Card");
const CardRenderer_1 = require("../render/CardRenderer");
class LunaGovernor extends Card_1.Card {
    constructor() {
        super({
            cost: 4,
            tags: [Tag_1.Tag.EARTH, Tag_1.Tag.EARTH],
            name: CardName_1.CardName.LUNA_GOVERNOR,
            type: CardType_1.CardType.AUTOMATED,
            behavior: {
                production: { megacredits: 2 },
            },
            requirements: { tag: Tag_1.Tag.EARTH, count: 3 },
            metadata: {
                cardNumber: 'C20',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.megacredits(2));
                }),
                description: 'Requires 3 Earth tags. Increase your M€ production 2 steps.',
            },
        });
    }
}
exports.LunaGovernor = LunaGovernor;
//# sourceMappingURL=LunaGovernor.js.map