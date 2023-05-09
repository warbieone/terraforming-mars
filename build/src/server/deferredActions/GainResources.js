"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GainResources = void 0;
const DeferredAction_1 = require("./DeferredAction");
class GainResources extends DeferredAction_1.DeferredAction {
    constructor(player, resource, options = {}) {
        var _a;
        super(player, DeferredAction_1.Priority.GAIN_RESOURCE_OR_PRODUCTION);
        this.resource = resource;
        this.options = options;
        if (((_a = options.count) !== null && _a !== void 0 ? _a : 0) < 0) {
            throw new Error('GainResources count option must be >= 0');
        }
    }
    execute() {
        var _a, _b, _c;
        if (this.options.count === 0) {
            return undefined;
        }
        this.player.addResource(this.resource, (_a = this.options.count) !== null && _a !== void 0 ? _a : 1, { log: this.options.log });
        (_c = (_b = this.options).cb) === null || _c === void 0 ? void 0 : _c.call(_b);
        return undefined;
    }
}
exports.GainResources = GainResources;
