"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolarPanelFoundry = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardRenderer_1 = require("../render/CardRenderer");
const ActionCard_1 = require("../ActionCard");
class SolarPanelFoundry extends ActionCard_1.ActionCard {
    constructor() {
        super({
            name: CardName_1.CardName.SOLAR_PANEL_FOUNDRY,
            type: CardType_1.CardType.ACTIVE,
            tags: [Tag_1.Tag.POWER, Tag_1.Tag.MOON, Tag_1.Tag.BUILDING],
            cost: 11,
            action: {
                spend: { steel: 2 },
                production: { energy: 1 },
            },
            metadata: {
                cardNumber: 'M89',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Spend 2 steel to increase your energy production 1 step.', (eb) => eb.startAction.steel(2).arrow().production((pb) => pb.energy(1)));
                }),
            },
        });
    }
}
exports.SolarPanelFoundry = SolarPanelFoundry;
