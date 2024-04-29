"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GainResources = void 0;
const DeferredAction_1 = require("./DeferredAction");
const Priority_1 = require("./Priority");
class GainResources extends DeferredAction_1.DeferredAction {
    constructor(player, resource, options = {}) {
        super(player, Priority_1.Priority.GAIN_RESOURCE_OR_PRODUCTION);
        this.resource = resource;
        this.options = options;
        if ((options.count ?? 0) < 0) {
            throw new Error('GainResources count option must be >= 0');
        }
    }
    execute() {
        if (this.options.count === 0) {
            return undefined;
        }
        this.player.stock.add(this.resource, this.options.count ?? 1, { log: this.options.log });
        this.cb(undefined);
        return undefined;
    }
}
exports.GainResources = GainResources;
