"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GainStock = void 0;
const Units_1 = require("../../common/Units");
const DeferredAction_1 = require("./DeferredAction");
class GainStock extends DeferredAction_1.DeferredAction {
    constructor(player, units, options = {}) {
        super(player, DeferredAction_1.Priority.GAIN_RESOURCE_OR_PRODUCTION);
        this.units = units;
        this.options = options;
        if (Units_1.Units.values(this.units).some((v) => v < 0)) {
            throw new Error('GainStock does not accept negative unit values');
        }
    }
    execute() {
        this.player.stock.addUnits(this.units, { log: this.options.log });
        this.options.cb?.();
        return undefined;
    }
}
exports.GainStock = GainStock;
