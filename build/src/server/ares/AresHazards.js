"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._AresHazardPlacement = void 0;
const LogHelper_1 = require("../LogHelper");
const Phase_1 = require("../../common/Phase");
const TileType_1 = require("../../common/TileType");
class _AresHazardPlacement {
    static putHazardAt(space, tileType) {
        space.tile = { tileType: tileType, protectedHazard: false };
    }
    static randomlyPlaceHazard(game, tileType, direction, cardCount = 1) {
        const space = game.getSpaceByOffset(direction, tileType, cardCount);
        this.putHazardAt(space, tileType);
        return space;
    }
    static makeSevere(game, from, to) {
        game.board.spaces
            .filter((s) => { var _a; return ((_a = s.tile) === null || _a === void 0 ? void 0 : _a.tileType) === from; })
            .forEach((s) => {
            if (s.tile !== undefined) {
                s.tile.tileType = to;
            }
        });
        game.log('${0} have upgraded to ${1}', (b) => b.string(TileType_1.TileType.toString(from)).string(TileType_1.TileType.toString(to)));
    }
    static onTemperatureChange(game, aresData) {
        this.testConstraint(aresData.hazardData.severeErosionTemperature, game.getTemperature(), () => {
            this.makeSevere(game, TileType_1.TileType.EROSION_MILD, TileType_1.TileType.EROSION_SEVERE);
        });
    }
    static onOceanPlaced(aresData, player) {
        this.testToPlaceErosionTiles(aresData, player);
        this.testToRemoveDustStorms(aresData, player);
    }
    static onOxygenChange(game, aresData) {
        this.testConstraint(aresData.hazardData.severeDustStormOxygen, game.getOxygenLevel(), () => {
            this.makeSevere(game, TileType_1.TileType.DUST_STORM_MILD, TileType_1.TileType.DUST_STORM_SEVERE);
        });
    }
    static testToPlaceErosionTiles(aresData, player) {
        if (player.game.gameOptions.aresHazards === false) {
            return;
        }
        this.testConstraint(aresData.hazardData.erosionOceanCount, player.game.board.getOceanCount(), () => {
            let type = TileType_1.TileType.EROSION_MILD;
            if (aresData.hazardData.severeErosionTemperature.available !== true) {
                type = TileType_1.TileType.EROSION_SEVERE;
            }
            const space1 = this.randomlyPlaceHazard(player.game, type, 1);
            const space2 = this.randomlyPlaceHazard(player.game, type, -1);
            [space1, space2].forEach((space) => {
                LogHelper_1.LogHelper.logTilePlacement(player, space, type);
            });
        });
    }
    static testToRemoveDustStorms(aresData, player) {
        this.testConstraint(aresData.hazardData.removeDustStormsOceanCount, player.game.board.getOceanCount(), () => {
            player.game.board.spaces.forEach((space) => {
                var _a, _b;
                if (((_a = space.tile) === null || _a === void 0 ? void 0 : _a.tileType) === TileType_1.TileType.DUST_STORM_MILD || ((_b = space.tile) === null || _b === void 0 ? void 0 : _b.tileType) === TileType_1.TileType.DUST_STORM_SEVERE) {
                    if (space.tile.protectedHazard !== true) {
                        space.tile = undefined;
                    }
                }
            });
            if (player.game.phase !== Phase_1.Phase.SOLAR) {
                player.increaseTerraformRating();
                player.game.log('${0}\'s TR increases 1 step for eliminating dust storms.', (b) => b.player(player));
            }
        });
    }
    static testConstraint(constraint, testValue, cb) {
        if (!constraint.available) {
            return;
        }
        if (testValue >= constraint.threshold) {
            cb();
            constraint.available = false;
        }
    }
}
exports._AresHazardPlacement = _AresHazardPlacement;
