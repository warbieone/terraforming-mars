"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdvancedPowerGrid = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Tag_1 = require("../../../common/cards/Tag");
const Options_1 = require("../Options");
class AdvancedPowerGrid extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.ADVANCED_POWER_GRID,
            cost: 18,
            tags: [Tag_1.Tag.POWER, Tag_1.Tag.BUILDING, Tag_1.Tag.MARS],
            behavior: {
                production: { megacredits: { tag: Tag_1.Tag.POWER }, energy: 2 },
            },
            metadata: {
                cardNumber: 'Pf56',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.energy(2).br.megacredits(1).slash().energy(1, { played: Options_1.played }));
                }),
                description: 'Increase your energy production 2 steps. Increase your M€ production 1 step per power tag you have, including this.',
            },
        });
    }
}
exports.AdvancedPowerGrid = AdvancedPowerGrid;
