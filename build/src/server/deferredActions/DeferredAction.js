"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleDeferredAction = exports.DeferredAction = void 0;
const Priority_1 = require("./Priority");
class DeferredAction {
    constructor(player, priority = Priority_1.Priority.DEFAULT) {
        this.player = player;
        this.priority = priority;
        this.queueId = -1;
        this.cb = () => { };
        this.callbackSet = false;
    }
    andThen(cb) {
        if (this.callbackSet) {
            throw new Error('Cannot call andThen twice for the same object.');
        }
        this.cb = cb;
        this.callbackSet = true;
        return this;
    }
}
exports.DeferredAction = DeferredAction;
class SimpleDeferredAction extends DeferredAction {
    constructor(player, execute, priority) {
        super(player, priority);
        this.execute = execute;
    }
}
exports.SimpleDeferredAction = SimpleDeferredAction;
