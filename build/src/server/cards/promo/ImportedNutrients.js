"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportedNutrients = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardResource_1 = require("../../../common/CardResource");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class ImportedNutrients extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.EVENT,
            name: CardName_1.CardName.IMPORTED_NUTRIENTS,
            tags: [Tag_1.Tag.EARTH, Tag_1.Tag.SPACE],
            cost: 14,
            behavior: {
                stock: { plants: 4 },
                addResourcesToAnyCard: { count: 4, type: CardResource_1.CardResource.MICROBE },
            },
            metadata: {
                cardNumber: 'X22',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.plants(4, { digit: Options_1.digit }).nbsp.microbes(4, { digit: Options_1.digit }).asterix();
                }),
                description: 'Gain 4 plants and add 4 microbes to ANOTHER CARD.',
            },
        });
    }
}
exports.ImportedNutrients = ImportedNutrients;
