"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArtificialLake = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class ArtificialLake extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.ARTIFICIAL_LAKE,
            tags: [Tag_1.Tag.BUILDING],
            cost: 15,
            tr: { oceans: 1 },
            victoryPoints: 1,
            behavior: {
                ocean: { on: 'land' },
            },
            requirements: { temperature: -6 },
            metadata: {
                description: 'Requires -6 C or warmer. Place 1 ocean tile ON AN AREA NOT RESERVED FOR OCEAN.',
                cardNumber: '116',
                renderData: CardRenderer_1.CardRenderer.builder((b) => b.oceans(1).asterix()),
            },
        });
    }
    bespokeCanPlay(player, canAffordOptions) {
        if (!player.game.canAddOcean())
            return true;
        return player.game.board.getAvailableSpacesOnLand(player, canAffordOptions).length > 0;
    }
}
exports.ArtificialLake = ArtificialLake;
//# sourceMappingURL=ArtificialLake.js.map