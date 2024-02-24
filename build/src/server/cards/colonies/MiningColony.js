"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiningColony = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const Card_1 = require("../Card");
const CardRenderer_1 = require("../render/CardRenderer");
class MiningColony extends Card_1.Card {
    constructor() {
        super({
            cost: 20,
            tags: [Tag_1.Tag.SPACE],
            name: CardName_1.CardName.MINING_COLONY,
            type: CardType_1.CardType.AUTOMATED,
            behavior: {
                production: { titanium: 1 },
                colonies: { buildColony: {} },
            },
            metadata: {
                cardNumber: 'C25',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.titanium(1)).colonies(1);
                }),
                description: 'Increase your titanium production 1 step. Place a colony.',
            },
        });
    }
}
exports.MiningColony = MiningColony;
