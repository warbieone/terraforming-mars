"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectResourcesDeferred = void 0;
const SelectResources_1 = require("../inputs/SelectResources");
const DeferredAction_1 = require("./DeferredAction");
class SelectResourcesDeferred extends DeferredAction_1.DeferredAction {
    constructor(player, count, title) {
        super(player, DeferredAction_1.Priority.DEFAULT);
        this.count = count;
        this.title = title;
    }
    execute() {
        return new SelectResources_1.SelectResources(this.player, this.count, this.title);
    }
}
exports.SelectResourcesDeferred = SelectResourcesDeferred;
