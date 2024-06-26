"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SellSteel = void 0;
const DeferredAction_1 = require("../deferredActions/DeferredAction");
const Priority_1 = require("../deferredActions/Priority");
const SelectAmount_1 = require("../inputs/SelectAmount");
const Resource_1 = require("../../common/Resource");
class SellSteel extends DeferredAction_1.DeferredAction {
    constructor(player, title = 'Sell your steel for 3M€ each.') {
        super(player, Priority_1.Priority.DEFAULT);
        this.title = title;
    }
    logSale(unitsSold) {
        this.player.game.log('${0} sold ${1} steel', (b) => b.player(this.player).number(unitsSold));
    }
    execute() {
        const unitsAvailable = this.player.steel;
        if (unitsAvailable <= 0) {
            this.logSale(0);
            return undefined;
        }
        return new SelectAmount_1.SelectAmount('Select a number of units of steel to sell', 'Sell steel', 0, unitsAvailable)
            .andThen((unitsSold) => {
            if (unitsSold > 0) {
                const cashEarned = unitsSold * 3;
                this.player.stock.add(Resource_1.Resource.MEGACREDITS, cashEarned);
                this.player.stock.deduct(Resource_1.Resource.STEEL, unitsSold);
            }
            this.logSale(unitsSold);
            return undefined;
        });
    }
}
exports.SellSteel = SellSteel;
