"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MartianRails = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const ActionCard_1 = require("../ActionCard");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
const Options_1 = require("../Options");
class MartianRails extends ActionCard_1.ActionCard {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.MARTIAN_RAILS,
            tags: [Tag_1.Tag.BUILDING],
            cost: 13,
            action: {
                spend: { energy: 1 },
                stock: { megacredits: { cities: { where: 'onmars' } } },
            },
            metadata: {
                cardNumber: '007',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Spend 1 energy to gain 1 M€ for each city tile ON MARS.', (eb) => {
                        eb.energy(1).startAction.megacredits(1).slash();
                        eb.city({ all: Options_1.all, size: Size_1.Size.SMALL }).asterix();
                    }).br;
                }),
            },
        });
    }
}
exports.MartianRails = MartianRails;
