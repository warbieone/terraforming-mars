"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionCard = void 0;
const Card_1 = require("./Card");
const BehaviorExecutor_1 = require("../behavior/BehaviorExecutor");
class ActionCard extends Card_1.Card {
    constructor(properties) {
        super(properties);
        this.actionBehavior = properties.action;
        (0, Card_1.validateBehavior)(properties.action);
    }
    canAct(player) {
        if (!(0, BehaviorExecutor_1.getBehaviorExecutor)().canExecute(this.actionBehavior, player, this)) {
            return false;
        }
        return this.bespokeCanAct(player);
    }
    action(player) {
        (0, BehaviorExecutor_1.getBehaviorExecutor)().execute(this.actionBehavior, player, this);
        return this.bespokeAction(player);
    }
    bespokeCanAct(_player) {
        return true;
    }
    bespokeAction(_player) {
        return undefined;
    }
}
exports.ActionCard = ActionCard;
