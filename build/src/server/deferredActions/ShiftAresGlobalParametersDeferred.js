"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShiftAresGlobalParametersDeferred = void 0;
const DeferredAction_1 = require("./DeferredAction");
const ShiftAresGlobalParameters_1 = require("../inputs/ShiftAresGlobalParameters");
const AresHandler_1 = require("../ares/AresHandler");
class ShiftAresGlobalParametersDeferred extends DeferredAction_1.DeferredAction {
    constructor(player) {
        super(player, DeferredAction_1.Priority.DEFAULT);
    }
    execute() {
        let pi = undefined;
        AresHandler_1.AresHandler.ifAres(this.player.game, (aresData) => {
            pi = new ShiftAresGlobalParameters_1.ShiftAresGlobalParameters(this.player, (response) => {
                const hazardData = aresData.hazardData;
                if (hazardData.erosionOceanCount.available) {
                    hazardData.erosionOceanCount.threshold += response.lowOceanDelta;
                }
                if (hazardData.removeDustStormsOceanCount.available) {
                    hazardData.removeDustStormsOceanCount.threshold += response.highOceanDelta;
                }
                if (hazardData.severeErosionTemperature.available) {
                    hazardData.severeErosionTemperature.threshold += (response.temperatureDelta * 2);
                }
                if (hazardData.severeDustStormOxygen.available) {
                    hazardData.severeDustStormOxygen.threshold += response.oxygenDelta;
                }
                if (response.temperatureDelta !== 0) {
                    AresHandler_1.AresHandler.onTemperatureChange(this.player.game, aresData);
                }
                if (response.oxygenDelta !== 0) {
                    AresHandler_1.AresHandler.onOxygenChange(this.player.game, aresData);
                }
                if (response.lowOceanDelta !== 0 || response.highOceanDelta !== 0) {
                    AresHandler_1.AresHandler.onOceanPlaced(aresData, this.player);
                }
                return undefined;
            });
        });
        if (pi === undefined) {
            throw new Error('Should not reach.');
        }
        return pi;
    }
}
exports.ShiftAresGlobalParametersDeferred = ShiftAresGlobalParametersDeferred;
