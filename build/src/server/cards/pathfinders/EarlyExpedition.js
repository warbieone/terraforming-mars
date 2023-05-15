"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EarlyExpedition = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Tag_1 = require("../../../common/cards/Tag");
const CardRequirements_1 = require("../CardRequirements");
const CardResource_1 = require("../../../common/CardResource");
const Options_1 = require("../Options");
class EarlyExpedition extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.EARLY_EXPEDITION,
            cost: 15,
            tags: [Tag_1.Tag.SCIENCE, Tag_1.Tag.SPACE, Tag_1.Tag.CITY],
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.temperature(-18, { max: Options_1.max })),
            behavior: {
                production: { energy: -1, megacredits: 3 },
                addResourcesToAnyCard: { type: CardResource_1.CardResource.DATA, count: 1 },
                city: { on: 'isolated' },
            },
            metadata: {
                cardNumber: 'Pf18',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.minus().production((pb) => pb.energy(1)).production((pb) => pb.megacredits(3)).br;
                    b.data().asterix().city().asterix();
                }),
                description: 'Temperature must be -18 C or lower. Decrease your energy production 1 step and ' +
                    'Raise your M€ production 3 steps. Add 1 data to ANY card. Place a city tile on Mars NEXT TO NO OTHER TILE.',
            },
        });
    }
}
exports.EarlyExpedition = EarlyExpedition;
//# sourceMappingURL=EarlyExpedition.js.map