"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElectroCatapult = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const ActionCard_1 = require("../ActionCard");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRequirements_1 = require("../CardRequirements");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class ElectroCatapult extends ActionCard_1.ActionCard {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.ELECTRO_CATAPULT,
            tags: [Tag_1.Tag.BUILDING],
            cost: 17,
            behavior: {
                production: { energy: -1 },
            },
            action: {
                or: {
                    autoSelect: true,
                    behaviors: [{
                            title: 'Spend 1 plant to gain 7 M€.',
                            spend: { plants: 1 },
                            stock: { megacredits: 7 },
                        },
                        {
                            title: 'Spend 1 steel to gain 7 M€.',
                            spend: { steel: 1 },
                            stock: { megacredits: 7 },
                        }],
                },
            },
            victoryPoints: 1,
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.oxygen(8, { max: Options_1.max })),
            metadata: {
                cardNumber: '069',
                description: {
                    text: 'Oxygen must be 8% or less. Decrease your energy production 1 step.',
                    align: 'left',
                },
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Spend 1 plant or 1 steel to gain 7 M€.', (eb) => {
                        eb.plants(1).slash().steel(1).startAction.megacredits(7);
                    }).br;
                    b.production((pb) => pb.minus().energy(1));
                }),
            },
        });
    }
}
exports.ElectroCatapult = ElectroCatapult;
//# sourceMappingURL=ElectroCatapult.js.map