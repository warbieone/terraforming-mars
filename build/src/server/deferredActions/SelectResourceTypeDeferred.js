"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectResourceTypeDeferred = void 0;
const OrOptions_1 = require("../inputs/OrOptions");
const SelectOption_1 = require("../inputs/SelectOption");
const DeferredAction_1 = require("./DeferredAction");
class SelectResourceTypeDeferred extends DeferredAction_1.DeferredAction {
    constructor(player, resources, title, cb) {
        super(player, DeferredAction_1.Priority.DEFAULT);
        this.resources = resources;
        this.title = title;
        this.cb = cb;
    }
    execute() {
        const orOptions = new OrOptions_1.OrOptions();
        orOptions.title = this.title;
        orOptions.options = this.resources.map((resource) => {
            return new SelectOption_1.SelectOption(resource, 'OK', () => {
                this.cb(resource);
                return undefined;
            });
        });
        if (orOptions.options.length === 0) {
            return undefined;
        }
        if (orOptions.options.length === 1) {
            orOptions.options[0].cb();
            return undefined;
        }
        return orOptions;
    }
}
exports.SelectResourceTypeDeferred = SelectResourceTypeDeferred;
