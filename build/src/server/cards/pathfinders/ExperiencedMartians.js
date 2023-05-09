"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExperiencedMartians = void 0;
const PreludeCard_1 = require("../prelude/PreludeCard");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Tag_1 = require("../../../common/cards/Tag");
class ExperiencedMartians extends PreludeCard_1.PreludeCard {
    constructor() {
        super({
            name: CardName_1.CardName.EXPERIENCED_MARTIANS,
            behavior: {
                production: { megacredits: 2 },
                drawCard: { count: 2, tag: Tag_1.Tag.MARS },
                turmoil: { sendDelegates: { count: 1 } },
            },
            metadata: {
                cardNumber: 'P08',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.delegates(1).cards(1, { secondaryTag: Tag_1.Tag.MARS }).cards(1, { secondaryTag: Tag_1.Tag.MARS }).production((pb) => pb.megacredits(2));
                }),
                description: 'Place 1 delegate in any party. Draw 2 cards with a Mars tag. Increase your M€ production 2 steps.',
            },
        });
    }
}
exports.ExperiencedMartians = ExperiencedMartians;
