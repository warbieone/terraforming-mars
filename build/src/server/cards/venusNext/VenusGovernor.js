"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VenusGovernor = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
class VenusGovernor extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.VENUS_GOVERNOR,
            type: CardType_1.CardType.AUTOMATED,
            tags: [Tag_1.Tag.VENUS, Tag_1.Tag.VENUS],
            cost: 4,
            requirements: { tag: Tag_1.Tag.VENUS, count: 2 },
            behavior: {
                production: { megacredits: 2 },
            },
            metadata: {
                cardNumber: '255',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.megacredits(2));
                }),
                description: 'Requires 2 Venus tags. Increase your M€ production 2 steps.',
            },
        });
    }
}
exports.VenusGovernor = VenusGovernor;
//# sourceMappingURL=VenusGovernor.js.map