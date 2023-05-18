"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImpactorSwarm = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRequirements_1 = require("../requirements/CardRequirements");
const Card_1 = require("../Card");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class ImpactorSwarm extends Card_1.Card {
    constructor() {
        super({
            cost: 11,
            tags: [Tag_1.Tag.SPACE],
            name: CardName_1.CardName.IMPACTOR_SWARM,
            type: CardType_1.CardType.EVENT,
            behavior: {
                stock: { heat: 12 },
                removeAnyPlants: 2,
            },
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.tag(Tag_1.Tag.JOVIAN, 2)),
            metadata: {
                cardNumber: 'C16',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.heat(12, { digit: Options_1.digit }).br;
                    b.minus().plants(2, { all: Options_1.all });
                }),
                description: 'Requires 2 Jovian tags. Gain 12 heat. Remove up to 2 plants from any player.',
            },
        });
    }
}
exports.ImpactorSwarm = ImpactorSwarm;
//# sourceMappingURL=ImpactorSwarm.js.map