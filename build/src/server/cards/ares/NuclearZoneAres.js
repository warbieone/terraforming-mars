"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NuclearZoneAres = void 0;
const TileType_1 = require("../../../common/TileType");
const CardName_1 = require("../../../common/cards/CardName");
const NuclearZone_1 = require("../base/NuclearZone");
const CardRenderer_1 = require("../render/CardRenderer");
class NuclearZoneAres extends NuclearZone_1.NuclearZone {
    constructor() {
        super(CardName_1.CardName.NUCLEAR_ZONE_ARES, 11, { bonus: [], cost: 2 }, {
            cardNumber: 'A19',
            renderData: CardRenderer_1.CardRenderer.builder((b) => {
                b.tile(TileType_1.TileType.NUCLEAR_ZONE, false, true).br;
                b.temperature(2);
            }),
            description: 'Raise the temperature two steps. Place this tile. Players must pay an additional 2M€ when they place a tile with their player marker on it ADJACENT to the Nuclear Zone.',
        });
    }
}
exports.NuclearZoneAres = NuclearZoneAres;
