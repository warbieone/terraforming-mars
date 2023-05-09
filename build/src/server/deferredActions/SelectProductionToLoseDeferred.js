"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectProductionToLoseDeferred = void 0;
const SelectProductionToLose_1 = require("../inputs/SelectProductionToLose");
const DeferredAction_1 = require("./DeferredAction");
const Units_1 = require("../../common/Units");
class SelectProductionToLoseDeferred extends DeferredAction_1.DeferredAction {
    constructor(player, unitsToLose, title = `Choose ${unitsToLose} unit(s) of production to lose`) {
        super(player, DeferredAction_1.Priority.LOSE_RESOURCE_OR_PRODUCTION);
        this.unitsToLose = unitsToLose;
        this.title = title;
    }
    execute() {
        return new SelectProductionToLose_1.SelectProductionToLose(this.title, this.unitsToLose, this.player, (production) => {
            this.player.production.adjust(Units_1.Units.negative(production), { log: true });
            return undefined;
        });
    }
}
exports.SelectProductionToLoseDeferred = SelectProductionToLoseDeferred;
