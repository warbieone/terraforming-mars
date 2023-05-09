"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrantVenusAltTrackBonusDeferred = void 0;
const OrOptions_1 = require("../inputs/OrOptions");
const SelectCard_1 = require("../inputs/SelectCard");
const DeferredAction_1 = require("../deferredActions/DeferredAction");
const SelectResources_1 = require("../inputs/SelectResources");
class GrantVenusAltTrackBonusDeferred extends DeferredAction_1.DeferredAction {
    constructor(player, standardResourceCount, wildResource) {
        super(player, DeferredAction_1.Priority.GAIN_RESOURCE_OR_PRODUCTION);
        this.standardResourceCount = standardResourceCount;
        this.wildResource = wildResource;
    }
    selectStandardResources(count) {
        return new SelectResources_1.SelectResources(this.player, count, `Gain ${count} resources for your Venus track bonus.`);
    }
    execute() {
        const resourceCards = this.player.getResourceCards(undefined);
        if (this.wildResource === false || resourceCards.length === 0) {
            return this.selectStandardResources(this.standardResourceCount);
        }
        const selectCard = new SelectCard_1.SelectCard('Add resource to card', 'Add resource', resourceCards, (selected) => {
            this.player.addResourceTo(selected[0], { qty: 1, log: true });
            return undefined;
        });
        const wild = new OrOptions_1.OrOptions(selectCard, this.selectStandardResources(1));
        if (this.standardResourceCount > 0) {
            wild.cb = () => {
                return this.standardResourceCount > 0 ?
                    this.selectStandardResources(this.standardResourceCount) :
                    undefined;
            };
            wild.title = `Choose your wild resource bonus, after which you will gain ${this.standardResourceCount} more distinct standard resources.`;
        }
        else {
            wild.title = 'Choose your wild resource bonus.';
        }
        return wild;
    }
}
exports.GrantVenusAltTrackBonusDeferred = GrantVenusAltTrackBonusDeferred;
