"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MercurianAlloys = void 0;
const Card_1 = require("../Card");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardRequirements_1 = require("../CardRequirements");
const CardRenderer_1 = require("../render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
class MercurianAlloys extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.MERCURIAN_ALLOYS,
            tags: [Tag_1.Tag.SPACE],
            cost: 3,
            behavior: {
                titanumValue: 1,
            },
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.tag(Tag_1.Tag.SCIENCE, 2)),
            metadata: {
                cardNumber: 'X07',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.effect('Your titanium resources are worth 1 M€ extra.', (eb) => {
                        eb.titanium(1).startEffect.plus(Size_1.Size.SMALL).megacredits(1);
                    });
                }),
                description: 'Requires 2 science tags.',
            },
        });
    }
}
exports.MercurianAlloys = MercurianAlloys;
//# sourceMappingURL=MercurianAlloys.js.map