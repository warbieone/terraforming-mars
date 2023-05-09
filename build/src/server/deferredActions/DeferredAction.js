"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleDeferredAction = exports.DeferredAction = exports.Priority = void 0;
var Priority;
(function (Priority) {
    Priority[Priority["SUPERPOWER"] = -1] = "SUPERPOWER";
    Priority[Priority["DECLARE_CLONE_TAG"] = 0] = "DECLARE_CLONE_TAG";
    Priority[Priority["COST"] = 1] = "COST";
    Priority[Priority["OPPONENT_TRIGGER"] = 2] = "OPPONENT_TRIGGER";
    Priority[Priority["SPONSORED_ACADEMIES"] = 3] = "SPONSORED_ACADEMIES";
    Priority[Priority["DISCARD_AND_DRAW"] = 4] = "DISCARD_AND_DRAW";
    Priority[Priority["DRAW_CARDS"] = 5] = "DRAW_CARDS";
    Priority[Priority["BUILD_COLONY"] = 6] = "BUILD_COLONY";
    Priority[Priority["INCREASE_COLONY_TRACK"] = 7] = "INCREASE_COLONY_TRACK";
    Priority[Priority["PLACE_OCEAN_TILE"] = 8] = "PLACE_OCEAN_TILE";
    Priority[Priority["DEFAULT"] = 9] = "DEFAULT";
    Priority[Priority["ATTACK_OPPONENT"] = 10] = "ATTACK_OPPONENT";
    Priority[Priority["LOSE_AS_MUCH_AS_POSSIBLE"] = 11] = "LOSE_AS_MUCH_AS_POSSIBLE";
    Priority[Priority["GAIN_RESOURCE_OR_PRODUCTION"] = 12] = "GAIN_RESOURCE_OR_PRODUCTION";
    Priority[Priority["LOSE_RESOURCE_OR_PRODUCTION"] = 13] = "LOSE_RESOURCE_OR_PRODUCTION";
    Priority[Priority["DECREASE_COLONY_TRACK_AFTER_TRADE"] = 14] = "DECREASE_COLONY_TRACK_AFTER_TRADE";
    Priority[Priority["DISCARD_CARDS"] = 15] = "DISCARD_CARDS";
})(Priority = exports.Priority || (exports.Priority = {}));
class DeferredAction {
    constructor(player, priority = Priority.DEFAULT) {
        this.player = player;
        this.priority = priority;
        this.queueId = -1;
    }
    static create(player, priority, execute) {
        return new SimpleDeferredAction(player, execute, priority);
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
