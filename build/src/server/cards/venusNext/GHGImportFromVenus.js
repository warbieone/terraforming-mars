"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GHGImportFromVenus = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
class GHGImportFromVenus extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.GHG_IMPORT_FROM_VENUS,
            type: CardType_1.CardType.EVENT,
            tags: [Tag_1.Tag.SPACE, Tag_1.Tag.VENUS],
            cost: 23,
            behavior: {
                production: { heat: 3 },
                global: { venus: 1 },
            },
            metadata: {
                description: 'Raise Venus 1 step. Increase your heat production 3 steps.',
                cardNumber: '228',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.venus(1).production((pb) => {
                        pb.heat(3);
                    });
                }),
            },
        });
    }
}
exports.GHGImportFromVenus = GHGImportFromVenus;
