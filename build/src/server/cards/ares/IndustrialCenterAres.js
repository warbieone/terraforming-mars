"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndustrialCenterAres = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const SpaceBonus_1 = require("../../../common/boards/SpaceBonus");
const IndustrialCenter_1 = require("../base/IndustrialCenter");
const TileType_1 = require("../../../common/TileType");
const CardRenderer_1 = require("../render/CardRenderer");
class IndustrialCenterAres extends IndustrialCenter_1.IndustrialCenter {
    constructor() {
        super(CardName_1.CardName.INDUSTRIAL_CENTER_ARES, { bonus: [SpaceBonus_1.SpaceBonus.STEEL] }, {
            cardNumber: 'A10',
            renderData: CardRenderer_1.CardRenderer.builder((b) => {
                b.action('Spend 7 M€ to increase your steel production 1 step.', (eb) => {
                    eb.megacredits(7).startAction.production((pb) => pb.steel(1));
                }).br;
                b.tile(TileType_1.TileType.INDUSTRIAL_CENTER, false, true).asterix();
            }),
            description: 'Place this tile adjacent to a city tile. This tile grants an ADJACENCY BONUS of 1 steel.',
        });
    }
}
exports.IndustrialCenterAres = IndustrialCenterAres;
