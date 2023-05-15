"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WarpDrive = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const CardRequirements_1 = require("../CardRequirements");
const Card_1 = require("../Card");
const Options_1 = require("../Options");
class WarpDrive extends Card_1.Card {
    constructor() {
        super({
            cost: 16,
            tags: [Tag_1.Tag.SCIENCE],
            name: CardName_1.CardName.WARP_DRIVE,
            type: CardType_1.CardType.ACTIVE,
            victoryPoints: 2,
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.tag(Tag_1.Tag.SCIENCE, 5)),
            cardDiscount: { tag: Tag_1.Tag.SPACE, amount: 4 },
            metadata: {
                cardNumber: 'C49',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.effect('When you play a space card, you pay 4 M€ less for it.', (eb) => {
                        eb.space({ played: Options_1.played }).startEffect.megacredits(-4);
                    });
                }),
                description: 'Requires 5 science tags.',
            },
        });
    }
}
exports.WarpDrive = WarpDrive;
//# sourceMappingURL=WarpDrive.js.map