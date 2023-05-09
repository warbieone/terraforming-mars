"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrantResourceDeferred = void 0;
const OrOptions_1 = require("../inputs/OrOptions");
const SelectCard_1 = require("../inputs/SelectCard");
const DeferredAction_1 = require("../deferredActions/DeferredAction");
const SelectResources_1 = require("../inputs/SelectResources");
class GrantResourceDeferred extends DeferredAction_1.DeferredAction {
    constructor(player, wild = true) {
        super(player, DeferredAction_1.Priority.GAIN_RESOURCE_OR_PRODUCTION);
        this.wild = wild;
    }
    execute() {
        const options = new OrOptions_1.OrOptions();
        options.title = 'Choose your resource bonus';
        options.options.push(new SelectResources_1.SelectResources(this.player, 1, 'Gain 1 standard resource.'));
        if (this.wild) {
            const cards = this.player.getResourceCards(undefined);
            if (cards.length > 0) {
                options.options.push(new SelectCard_1.SelectCard('Add resource to card', 'Add resource', this.player.getResourceCards(undefined), (selected) => {
                    this.player.addResourceTo(selected[0], { qty: 1, log: true });
                    return undefined;
                }));
                options.title = 'Choose your wild resource bonus.';
            }
        }
        return options;
    }
}
exports.GrantResourceDeferred = GrantResourceDeferred;
