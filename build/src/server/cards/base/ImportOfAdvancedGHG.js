"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportOfAdvancedGHG = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class ImportOfAdvancedGHG extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.EVENT,
            name: CardName_1.CardName.IMPORT_OF_ADVANCED_GHG,
            tags: [Tag_1.Tag.EARTH, Tag_1.Tag.SPACE],
            cost: 9,
            behavior: {
                production: { heat: 2 },
            },
            metadata: {
                cardNumber: '167',
                renderData: CardRenderer_1.CardRenderer.builder((b) => b.production((pb) => pb.heat(2))),
                description: 'Increase your heat production 2 steps.',
            },
        });
    }
}
exports.ImportOfAdvancedGHG = ImportOfAdvancedGHG;
