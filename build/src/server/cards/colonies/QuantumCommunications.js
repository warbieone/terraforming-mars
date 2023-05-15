"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuantumCommunications = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const Resource_1 = require("../../../common/Resource");
const CardRenderer_1 = require("../render/CardRenderer");
const CardRequirements_1 = require("../CardRequirements");
const Card_1 = require("../Card");
const Size_1 = require("../../../common/cards/render/Size");
const Options_1 = require("../Options");
class QuantumCommunications extends Card_1.Card {
    constructor() {
        super({
            cost: 8,
            name: CardName_1.CardName.QUANTUM_COMMUNICATIONS,
            type: CardType_1.CardType.AUTOMATED,
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.tag(Tag_1.Tag.SCIENCE, 4)),
            victoryPoints: 1,
            metadata: {
                cardNumber: '079',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => {
                        pb.megacredits(1).slash().colonies(1, { size: Size_1.Size.SMALL, all: Options_1.all });
                    });
                }),
                description: 'Requires 4 science tags. Increase your M€ production 1 step for each colony in play.',
            },
        });
    }
    bespokePlay(player) {
        let coloniesCount = 0;
        player.game.colonies.forEach((colony) => {
            coloniesCount += colony.colonies.length;
        });
        player.production.add(Resource_1.Resource.MEGACREDITS, coloniesCount, { log: true });
        return undefined;
    }
}
exports.QuantumCommunications = QuantumCommunications;
//# sourceMappingURL=QuantumCommunications.js.map