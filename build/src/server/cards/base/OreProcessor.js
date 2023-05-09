"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OreProcessor = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const ActionCard_1 = require("../ActionCard");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class OreProcessor extends ActionCard_1.ActionCard {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.ORE_PROCESSOR,
            tags: [Tag_1.Tag.BUILDING],
            cost: 13,
            action: {
                spend: { energy: 4 },
                stock: { titanium: 1 },
                global: { oxygen: 1 },
            },
            metadata: {
                cardNumber: '104',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Spend 4 energy to gain 1 titanium and increase oxygen 1 step.', (eb) => {
                        eb.energy(4, { digit: Options_1.digit }).startAction.titanium(1).oxygen(1);
                    });
                }),
            },
        });
    }
}
exports.OreProcessor = OreProcessor;
