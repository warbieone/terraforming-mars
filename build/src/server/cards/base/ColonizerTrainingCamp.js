"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColonizerTrainingCamp = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRequirements_1 = require("../CardRequirements");
const Options_1 = require("../Options");
class ColonizerTrainingCamp extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.COLONIZER_TRAINING_CAMP,
            tags: [Tag_1.Tag.JOVIAN, Tag_1.Tag.BUILDING],
            cost: 8,
            victoryPoints: 2,
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.oxygen(5, { max: Options_1.max })),
            metadata: {
                description: 'Oxygen must be 5% or less.',
                cardNumber: '001',
            },
        });
    }
}
exports.ColonizerTrainingCamp = ColonizerTrainingCamp;
//# sourceMappingURL=ColonizerTrainingCamp.js.map