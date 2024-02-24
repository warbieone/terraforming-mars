"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportedGHG = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class ImportedGHG extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.EVENT,
            name: CardName_1.CardName.IMPORTED_GHG,
            tags: [Tag_1.Tag.EARTH, Tag_1.Tag.SPACE],
            cost: 7,
            behavior: {
                production: { heat: 1 },
                stock: { heat: 3 },
            },
            metadata: {
                cardNumber: '162',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.heat(1)).heat(3);
                }),
                description: 'Increase your heat production 1 step and gain 3 heat.',
            },
        });
    }
}
exports.ImportedGHG = ImportedGHG;
