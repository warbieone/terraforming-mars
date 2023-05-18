"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Insects = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRequirements_1 = require("../requirements/CardRequirements");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class Insects extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.INSECTS,
            tags: [Tag_1.Tag.MICROBE],
            cost: 11,
            behavior: {
                production: { plants: { tag: Tag_1.Tag.PLANT } },
            },
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.oxygen(6)),
            metadata: {
                cardNumber: '148',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.plants(1).slash().plants(1, { played: Options_1.played }));
                }),
                description: 'Requires 6% oxygen. Increase your plant production 1 step for each plant tag you have.',
            },
        });
    }
}
exports.Insects = Insects;
//# sourceMappingURL=Insects.js.map