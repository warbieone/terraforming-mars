"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommercialDistrictAres = void 0;
const SpaceBonus_1 = require("../../../common/boards/SpaceBonus");
const CardName_1 = require("../../../common/cards/CardName");
const CommercialDistrict_1 = require("../base/CommercialDistrict");
const CardRenderer_1 = require("../render/CardRenderer");
const TileType_1 = require("../../../common/TileType");
const CardRenderDynamicVictoryPoints_1 = require("../render/CardRenderDynamicVictoryPoints");
class CommercialDistrictAres extends CommercialDistrict_1.CommercialDistrict {
    constructor() {
        super(CardName_1.CardName.COMMERCIAL_DISTRICT_ARES, { bonus: [SpaceBonus_1.SpaceBonus.MEGACREDITS, SpaceBonus_1.SpaceBonus.MEGACREDITS] }, {
            cardNumber: 'A06',
            description: 'Place this tile which grants an ADJACENCY BONUS of 2 M€. Decrease your energy production 1 step and increase your M€ production 4 steps.',
            renderData: CardRenderer_1.CardRenderer.builder((b) => {
                b.production((pb) => {
                    pb.minus().energy(1).br;
                    pb.plus().megacredits(4).br;
                }).nbsp.nbsp.tile(TileType_1.TileType.COMMERCIAL_DISTRICT, false, true).br;
                b.vpText('1 VP per adjacent city tile.');
            }),
            victoryPoints: CardRenderDynamicVictoryPoints_1.CardRenderDynamicVictoryPoints.cities(1, 1, true),
        });
    }
}
exports.CommercialDistrictAres = CommercialDistrictAres;
