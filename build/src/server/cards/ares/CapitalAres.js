"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CapitalAres = void 0;
const SpaceBonus_1 = require("../../../common/boards/SpaceBonus");
const CardName_1 = require("../../../common/cards/CardName");
const TileType_1 = require("../../../common/TileType");
const Capital_1 = require("../base/Capital");
const CardRenderer_1 = require("../render/CardRenderer");
const CardRenderDynamicVictoryPoints_1 = require("../render/CardRenderDynamicVictoryPoints");
class CapitalAres extends Capital_1.Capital {
    constructor() {
        super(CardName_1.CardName.CAPITAL_ARES, { bonus: [SpaceBonus_1.SpaceBonus.MEGACREDITS, SpaceBonus_1.SpaceBonus.MEGACREDITS] }, {
            cardNumber: 'A05',
            description: {
                text: 'Requires 4 ocean tiles. Place tile with ADJACENCY BONUS of 2 M€. Energy prod -2 and M€ prod +5.',
                align: 'left',
            },
            renderData: CardRenderer_1.CardRenderer.builder((b) => {
                b.production((pb) => {
                    pb.minus().energy(2).br;
                    pb.plus().megacredits(5);
                }).nbsp.tile(TileType_1.TileType.CAPITAL, false, true).br;
                b.vpText('1 additional VP for each ocean tile adjacent to this city tile.');
            }),
            victoryPoints: CardRenderDynamicVictoryPoints_1.CardRenderDynamicVictoryPoints.oceans(1, 1),
        });
    }
}
exports.CapitalAres = CapitalAres;
