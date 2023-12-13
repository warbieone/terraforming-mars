"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArchaeBacteria = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class ArchaeBacteria extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.ARCHAEBACTERIA,
            tags: [Tag_1.Tag.MICROBE],
            cost: 6,
            behavior: {
                production: { plants: 1 },
            },
            requirements: { temperature: -18, max: Options_1.max },
            metadata: {
                description: 'It must be -18 C or colder. Increase your plant production 1 step.',
                cardNumber: '042',
                renderData: CardRenderer_1.CardRenderer.builder((b) => b.production((pb) => pb.plants(1))),
            },
        });
    }
}
exports.ArchaeBacteria = ArchaeBacteria;
//# sourceMappingURL=ArchaeBacteria.js.map