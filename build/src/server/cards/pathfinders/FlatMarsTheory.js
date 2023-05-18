"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlatMarsTheory = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Tag_1 = require("../../../common/cards/Tag");
const CardRequirements_1 = require("../requirements/CardRequirements");
const Resource_1 = require("../../../common/Resource");
const Options_1 = require("../Options");
class FlatMarsTheory extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.FLAT_MARS_THEORY,
            cost: 8,
            tags: [Tag_1.Tag.EARTH],
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.tag(Tag_1.Tag.SCIENCE, 1, { max: Options_1.max })),
            metadata: {
                cardNumber: 'Pf39',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.megacredits(1)).slash().text('GENERATION');
                }),
                description: 'Requires maximum 1 science tag. Increase your M€ production 1 step for every generation played so far.',
            },
        });
    }
    bespokePlay(player) {
        const generation = player.game.generation;
        player.production.add(Resource_1.Resource.MEGACREDITS, generation, { log: true });
        return undefined;
    }
}
exports.FlatMarsTheory = FlatMarsTheory;
//# sourceMappingURL=FlatMarsTheory.js.map