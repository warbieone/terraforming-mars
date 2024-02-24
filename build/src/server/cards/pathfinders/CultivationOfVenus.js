"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CultivationOfVenus = void 0;
const ActionCard_1 = require("../ActionCard");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Tag_1 = require("../../../common/cards/Tag");
class CultivationOfVenus extends ActionCard_1.ActionCard {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.CULTIVATION_OF_VENUS,
            cost: 18,
            tags: [Tag_1.Tag.PLANT, Tag_1.Tag.VENUS],
            victoryPoints: { tag: Tag_1.Tag.VENUS, per: 2 },
            action: {
                spend: { plants: 3 },
                global: { venus: 1 },
            },
            metadata: {
                cardNumber: 'Pf45',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Spend 3 plants to raise Venus 1 step.', (eb) => {
                        eb.plants(3).startAction.venus(1);
                    }).br;
                }),
                description: '1 VP for every 2 Venus tags you own.',
            },
        });
    }
}
exports.CultivationOfVenus = CultivationOfVenus;
