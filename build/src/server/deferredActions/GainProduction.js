"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GainProduction = void 0;
const DeferredAction_1 = require("./DeferredAction");
class GainProduction extends DeferredAction_1.DeferredAction {
    constructor(player, resource, options = {}) {
        super(player, DeferredAction_1.Priority.GAIN_RESOURCE_OR_PRODUCTION);
        this.resource = resource;
        this.options = options;
    }
    execute() {
        if (this.options.count === undefined) {
            this.options.count = 1;
        }
        else if (this.options.count < 0) {
            throw new Error('GainProduction count option must be >= 0');
        }
        if (this.options.count > 0) {
            this.player.production.add(this.resource, this.options.count, { log: this.options.log ?? true });
        }
        this.cb(undefined);
        return undefined;
    }
}
exports.GainProduction = GainProduction;
