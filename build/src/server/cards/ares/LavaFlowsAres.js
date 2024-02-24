"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LavaFlowsAres = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const SpaceBonus_1 = require("../../../common/boards/SpaceBonus");
const LavaFlows_1 = require("../base/LavaFlows");
const TileType_1 = require("../../../common/TileType");
const CardRenderer_1 = require("../render/CardRenderer");
class LavaFlowsAres extends LavaFlows_1.LavaFlows {
    constructor() {
        super(CardName_1.CardName.LAVA_FLOWS_ARES, { bonus: [SpaceBonus_1.SpaceBonus.HEAT, SpaceBonus_1.SpaceBonus.HEAT] }, {
            cardNumber: 'A11',
            renderData: CardRenderer_1.CardRenderer.builder((b) => {
                b.temperature(2).br;
                b.tile(TileType_1.TileType.LAVA_FLOWS, false, true);
            }),
            description: 'Raise temperature 2 steps and place this tile ON EITHER THARSIS THOLUS, ASCRAEUS MONS, PAVONIS MONS OR ARSIA MONS. This tile grants an ADJACENCY BONUS of 2 heat.',
        });
    }
}
exports.LavaFlowsAres = LavaFlowsAres;
