"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TerraformingControlStation = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Tag_1 = require("../../../common/cards/Tag");
const Options_1 = require("../Options");
class TerraformingControlStation extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.TERRAFORMING_CONTROL_STATION,
            cost: 18,
            tags: [Tag_1.Tag.VENUS, Tag_1.Tag.MARS, Tag_1.Tag.SPACE],
            behavior: {
                tr: 2,
            },
            cardDiscount: [{ tag: Tag_1.Tag.VENUS, amount: 2 }, { tag: Tag_1.Tag.MARS, amount: 2 }],
            metadata: {
                cardNumber: 'Pf12',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.effect('When you play a Venus or Mars tag, pay 2 M€ less.', (eb) => {
                        eb.venus(1, { played: Options_1.played }).slash().mars(1, { played: Options_1.played }).startEffect.megacredits(-2);
                    });
                    b.br.tr(2);
                }),
                description: 'Raise your TR 2 steps.',
            },
        });
    }
}
exports.TerraformingControlStation = TerraformingControlStation;
