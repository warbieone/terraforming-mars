"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportedNitrogen = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardResource_1 = require("../../../common/CardResource");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class ImportedNitrogen extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.EVENT,
            name: CardName_1.CardName.IMPORTED_NITROGEN,
            tags: [Tag_1.Tag.EARTH, Tag_1.Tag.SPACE],
            cost: 23,
            behavior: {
                stock: { plants: 4 },
                tr: 1,
                addResourcesToAnyCard: [
                    { type: CardResource_1.CardResource.MICROBE, count: 3 },
                    { type: CardResource_1.CardResource.ANIMAL, count: 2 },
                ],
            },
            metadata: {
                cardNumber: '163',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.tr(1).br;
                    b.plants(4, { digit: Options_1.digit });
                    b.microbes(3, { digit: Options_1.digit }).asterix().nbsp;
                    b.animals(2, { digit: Options_1.digit }).asterix();
                }),
                description: 'Raise your TR 1 step and gain 4 plants. Add 3 microbes to ANOTHER card and 2 animals to ANOTHER card.',
            },
        });
    }
}
exports.ImportedNitrogen = ImportedNitrogen;
