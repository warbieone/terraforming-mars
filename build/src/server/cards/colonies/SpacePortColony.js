"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpacePortColony = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
const Options_1 = require("../Options");
class SpacePortColony extends Card_1.Card {
    constructor() {
        super({
            cost: 27,
            tags: [Tag_1.Tag.SPACE],
            name: CardName_1.CardName.SPACE_PORT_COLONY,
            type: CardType_1.CardType.AUTOMATED,
            requirements: { colonies: 1 },
            victoryPoints: { colonies: { colonies: {} }, all: Options_1.all, per: 2 },
            behavior: {
                colonies: {
                    buildColony: { allowDuplicates: true },
                    addTradeFleet: 1,
                },
            },
            metadata: {
                cardNumber: 'C40',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.colonies(1).asterix().nbsp.tradeFleet().br;
                    b.vpText('1VP per 2 colonies in play.');
                }),
                description: 'Requires a colony. Place a colony. MAY BE PLACED ON A COLONY TILE WHERE YOU ALREADY HAVE A COLONY. Gain 1 Trade Fleet.',
            },
        });
    }
    getVictoryPoints(player) {
        let coloniesCount = 0;
        player.game.colonies.forEach((colony) => {
            coloniesCount += colony.colonies.length;
        });
        return Math.floor(coloniesCount / 2);
    }
}
exports.SpacePortColony = SpacePortColony;
