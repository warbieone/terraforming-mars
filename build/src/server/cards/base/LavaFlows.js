"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LavaFlows = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const TileType_1 = require("../../../common/TileType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class LavaFlows extends Card_1.Card {
    constructor(name = CardName_1.CardName.LAVA_FLOWS, adjacencyBonus = undefined, metadata = {
        cardNumber: '140',
        renderData: CardRenderer_1.CardRenderer.builder((b) => {
            b.temperature(2).br;
            b.tile(TileType_1.TileType.LAVA_FLOWS, true, false).asterix();
        }),
        description: 'Raise temperature 2 steps and place this tile ON EITHER THARSIS THOLUS, ASCRAEUS MONS, PAVONIS MONS OR ARSIA MONS.',
    }) {
        super({
            type: CardType_1.CardType.EVENT,
            name,
            cost: 18,
            adjacencyBonus,
            behavior: {
                global: { temperature: 2 },
                tile: {
                    type: TileType_1.TileType.LAVA_FLOWS,
                    on: 'volcanic',
                    title: 'Select either Tharsis Tholus, Ascraeus Mons, Pavonis Mons or Arsia Mons',
                    adjacencyBonus: adjacencyBonus,
                },
            },
            metadata,
        });
    }
}
exports.LavaFlows = LavaFlows;
