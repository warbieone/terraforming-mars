"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MolecularPrinting = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
const Size_1 = require("../../../common/cards/render/Size");
const Resource_1 = require("../../../common/Resource");
const Options_1 = require("../Options");
class MolecularPrinting extends Card_1.Card {
    constructor() {
        super({
            cost: 11,
            tags: [Tag_1.Tag.SCIENCE],
            name: CardName_1.CardName.MOLECULAR_PRINTING,
            type: CardType_1.CardType.AUTOMATED,
            victoryPoints: 1,
            metadata: {
                cardNumber: 'C27',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.megacredits(1).slash().city({ size: Size_1.Size.SMALL, all: Options_1.all }).br;
                    b.megacredits(1).slash().colonies(1, { size: Size_1.Size.SMALL, all: Options_1.all });
                }),
                description: 'Gain 1 M€ for each city tile in play. Gain 1 M€ for each colony in play.',
            },
        });
    }
    bespokePlay(player) {
        let coloniesCount = 0;
        player.game.colonies.forEach((colony) => {
            coloniesCount += colony.colonies.length;
        });
        player.addResource(Resource_1.Resource.MEGACREDITS, player.game.getCitiesCount() + coloniesCount, { log: true });
        return undefined;
    }
}
exports.MolecularPrinting = MolecularPrinting;
