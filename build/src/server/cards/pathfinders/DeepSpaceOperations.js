"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeepSpaceOperations = void 0;
const PreludeCard_1 = require("../prelude/PreludeCard");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
class DeepSpaceOperations extends PreludeCard_1.PreludeCard {
    constructor() {
        super({
            name: CardName_1.CardName.DEEP_SPACE_OPERATIONS,
            tags: [Tag_1.Tag.SPACE],
            behavior: {
                stock: { titanium: 4 },
                drawCard: { count: 2, tag: Tag_1.Tag.SPACE, type: CardType_1.CardType.EVENT },
            },
            metadata: {
                cardNumber: 'PfP12',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.titanium(4).br;
                    b.cards(2, { secondaryTag: Tag_1.Tag.EVENT }).super((sb) => sb.tag(Tag_1.Tag.SPACE));
                }),
                description: 'Gain 4 titanium. Draw 2 event cards with a space tag.',
            },
        });
    }
}
exports.DeepSpaceOperations = DeepSpaceOperations;
