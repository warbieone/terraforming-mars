"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiningRightsAres = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const MiningRights_1 = require("../base/MiningRights");
const TileType_1 = require("../../../common/TileType");
const CardRenderer_1 = require("../render/CardRenderer");
class MiningRightsAres extends MiningRights_1.MiningRights {
    constructor() {
        super(CardName_1.CardName.MINING_RIGHTS_ARES, {
            cardNumber: 'A15',
            renderData: CardRenderer_1.CardRenderer.builder((b) => {
                b.tile(TileType_1.TileType.MINING_STEEL_BONUS, false, true);
                b.tile(TileType_1.TileType.MINING_TITANIUM_BONUS, false, true).asterix().br;
                b.production((pb) => {
                    pb.steel(1).or().titanium(1);
                }).asterix();
            }),
            description: 'Place one of these tiles on an area with a steel or titanium placement bonus. This tile provides an ADJACENCY BONUS of the same resource as the area. Increase your production of that resource 1 step.',
        });
    }
}
exports.MiningRightsAres = MiningRightsAres;
