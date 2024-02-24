"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AresSetup = void 0;
const TileType_1 = require("../../common/TileType");
const AresHazards_1 = require("./AresHazards");
class AresSetup {
    constructor() { }
    static initialData(includeHazards, players) {
        return {
            includeHazards: includeHazards,
            hazardData: {
                erosionOceanCount: { threshold: 3, available: true },
                removeDustStormsOceanCount: { threshold: 6, available: true },
                severeErosionTemperature: { threshold: -4, available: true },
                severeDustStormOxygen: { threshold: 5, available: true },
            },
            milestoneResults: players.map((p) => {
                return { id: p.id, count: 0 };
            }),
        };
    }
    static setupHazards(game, playerCount) {
        if (playerCount >= 5) {
            AresHazards_1._AresHazardPlacement.randomlyPlaceHazard(game, TileType_1.TileType.DUST_STORM_MILD, 1, 2);
        }
        else if (playerCount === 4) {
            AresHazards_1._AresHazardPlacement.randomlyPlaceHazard(game, TileType_1.TileType.DUST_STORM_MILD, 1);
            AresHazards_1._AresHazardPlacement.randomlyPlaceHazard(game, TileType_1.TileType.DUST_STORM_MILD, -1);
        }
        else if (playerCount <= 3) {
            AresHazards_1._AresHazardPlacement.randomlyPlaceHazard(game, TileType_1.TileType.DUST_STORM_MILD, 1, 2);
            AresHazards_1._AresHazardPlacement.randomlyPlaceHazard(game, TileType_1.TileType.DUST_STORM_MILD, 1);
            AresHazards_1._AresHazardPlacement.randomlyPlaceHazard(game, TileType_1.TileType.DUST_STORM_MILD, -1);
        }
    }
}
exports.AresSetup = AresSetup;
