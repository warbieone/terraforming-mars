"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DuskLaserMining = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardRequirements_1 = require("../CardRequirements");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
const Options_1 = require("../Options");
class DuskLaserMining extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.DUSK_LASER_MINING,
            cost: 8,
            tags: [Tag_1.Tag.SPACE],
            behavior: {
                production: { energy: -1, titanium: 1 },
                stock: { titanium: 4 },
            },
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.tag(Tag_1.Tag.SCIENCE, 2)),
            metadata: {
                cardNumber: 'X01',
                description: 'Requires 2 science tags. Decrease your energy production 1 step, and increase your titanium production 1 step. Gain 4 titanium.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => {
                        pb.minus().energy(1).br;
                        pb.plus().titanium(1);
                    }).nbsp.titanium(4, { digit: Options_1.digit });
                }),
            },
        });
    }
}
exports.DuskLaserMining = DuskLaserMining;
//# sourceMappingURL=DuskLaserMining.js.map