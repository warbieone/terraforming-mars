"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrantVenusAltTrackBonusDeferred = void 0;
const OrOptions_1 = require("../inputs/OrOptions");
const SelectCard_1 = require("../inputs/SelectCard");
const DeferredAction_1 = require("../deferredActions/DeferredAction");
const Priority_1 = require("../deferredActions/Priority");
const GainResources_1 = require("../inputs/GainResources");
const MessageBuilder_1 = require("../logs/MessageBuilder");
class GrantVenusAltTrackBonusDeferred extends DeferredAction_1.DeferredAction {
    constructor(player, standardResourceCount, wildResource) {
        super(player, Priority_1.Priority.GAIN_RESOURCE_OR_PRODUCTION);
        this.standardResourceCount = standardResourceCount;
        this.wildResource = wildResource;
    }
    selectStandardResources(count) {
        return new GainResources_1.GainResources(this.player, count, (0, MessageBuilder_1.message)('Gain ${0} resource(s) for your Venus track bonus.', (b) => b.number(count)));
    }
    execute() {
        const resourceCards = this.player.getResourceCards(undefined);
        if (this.wildResource === false || resourceCards.length === 0) {
            return this.selectStandardResources(this.standardResourceCount);
        }
        const selectCard = new SelectCard_1.SelectCard('Add resource to card', 'Add resource', resourceCards)
            .andThen(([card]) => {
            this.player.addResourceTo(card, { qty: 1, log: true });
            return undefined;
        });
        const wild = new OrOptions_1.OrOptions(selectCard, this.selectStandardResources(1));
        if (this.standardResourceCount > 0) {
            wild.andThen(() => {
                return this.standardResourceCount > 0 ?
                    this.selectStandardResources(this.standardResourceCount) :
                    undefined;
            });
            wild.title = (0, MessageBuilder_1.message)('Choose your wild resource bonus, after which you will gain ${0} more distinct standard resources.', (b) => b.number(this.standardResourceCount));
        }
        else {
            wild.title = 'Choose your wild resource bonus.';
        }
        return wild;
    }
}
exports.GrantVenusAltTrackBonusDeferred = GrantVenusAltTrackBonusDeferred;
