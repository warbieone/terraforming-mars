"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Meltworks = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
const ActionCard_1 = require("../ActionCard");
class Meltworks extends ActionCard_1.ActionCard {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.MELTWORKS,
            tags: [Tag_1.Tag.BUILDING],
            cost: 4,
            action: {
                spend: { heat: 5 },
                stock: { steel: 3 },
            },
            metadata: {
                cardNumber: 'X26',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Spend 5 heat to gain 3 steel.', (eb) => {
                        eb.heat(5, { digit: Options_1.digit }).startAction.steel(3);
                    });
                }),
            },
        });
    }
}
exports.Meltworks = Meltworks;
