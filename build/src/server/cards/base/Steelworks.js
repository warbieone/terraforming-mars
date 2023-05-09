"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Steelworks = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const ActionCard_1 = require("../ActionCard");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class Steelworks extends ActionCard_1.ActionCard {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.STEELWORKS,
            tags: [Tag_1.Tag.BUILDING],
            cost: 15,
            action: {
                spend: { energy: 4 },
                stock: { steel: 2 },
                global: { oxygen: 1 },
            },
            metadata: {
                cardNumber: '103',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Spend 4 energy to gain 2 steel and increase oxygen 1 step.', (eb) => {
                        eb.energy(4, { digit: Options_1.digit }).startAction.steel(2).oxygen(1);
                    });
                }),
            },
        });
    }
}
exports.Steelworks = Steelworks;
