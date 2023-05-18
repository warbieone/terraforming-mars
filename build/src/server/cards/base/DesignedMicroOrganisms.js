"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DesignedMicroOrganisms = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRequirements_1 = require("../requirements/CardRequirements");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class DesignedMicroOrganisms extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.DESIGNED_MICROORGANISMS,
            tags: [Tag_1.Tag.SCIENCE, Tag_1.Tag.MICROBE],
            cost: 15,
            behavior: {
                production: { plants: 2 },
            },
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.temperature(-14, { max: Options_1.max })),
            metadata: {
                cardNumber: '155',
                description: 'It must be -14 C or colder. Increase your plant production 2 steps.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.plants(2));
                }),
            },
        });
    }
}
exports.DesignedMicroOrganisms = DesignedMicroOrganisms;
//# sourceMappingURL=DesignedMicroOrganisms.js.map