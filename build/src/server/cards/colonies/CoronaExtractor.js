"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoronaExtractor = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRequirements_1 = require("../requirements/CardRequirements");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
const Options_1 = require("../Options");
class CoronaExtractor extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.CORONA_EXTRACTOR,
            cost: 10,
            tags: [Tag_1.Tag.SPACE, Tag_1.Tag.POWER],
            behavior: {
                production: { energy: 4 },
            },
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.tag(Tag_1.Tag.SCIENCE, 4)),
            metadata: {
                cardNumber: 'C06',
                description: 'Requires 4 science tags. Increase your energy production 4 steps.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => b.production((pb) => pb.energy(4, { digit: Options_1.digit }))),
            },
        });
    }
}
exports.CoronaExtractor = CoronaExtractor;
//# sourceMappingURL=CoronaExtractor.js.map