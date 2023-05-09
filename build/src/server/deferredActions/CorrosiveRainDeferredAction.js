"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CorrosiveRainDeferredAction = void 0;
const SelectCard_1 = require("../inputs/SelectCard");
const OrOptions_1 = require("../inputs/OrOptions");
const Resource_1 = require("../../common/Resource");
const CardResource_1 = require("../../common/CardResource");
const SelectOption_1 = require("../inputs/SelectOption");
const DeferredAction_1 = require("./DeferredAction");
const GlobalEventName_1 = require("../../common/turmoil/globalEvents/GlobalEventName");
class CorrosiveRainDeferredAction extends DeferredAction_1.DeferredAction {
    constructor(player, title = 'Remove 2 floaters from a card or lose up to 10 M€') {
        super(player, DeferredAction_1.Priority.DEFAULT);
        this.title = title;
    }
    execute() {
        const floaterCards = this.player.getCardsWithResources(CardResource_1.CardResource.FLOATER).filter((card) => { var _a; return ((_a = card.resourceCount) !== null && _a !== void 0 ? _a : 0) >= 2; });
        const selectAction = new OrOptions_1.OrOptions();
        const payMC = new SelectOption_1.SelectOption('Lose up to 10 M€', 'Lose M€', () => {
            this.player.deductResource(Resource_1.Resource.MEGACREDITS, 10, { log: true, from: GlobalEventName_1.GlobalEventName.CORROSIVE_RAIN });
            return undefined;
        });
        const removeFloaters = new SelectCard_1.SelectCard('Select card to remove 2 floaters from', 'Remove floaters', floaterCards, ([card]) => {
            this.player.removeResourceFrom(card, 2);
            return undefined;
        });
        selectAction.options.push(payMC, removeFloaters);
        if (floaterCards.length === 0) {
            payMC.cb();
            return undefined;
        }
        return selectAction;
    }
}
exports.CorrosiveRainDeferredAction = CorrosiveRainDeferredAction;
