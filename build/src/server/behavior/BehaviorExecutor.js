"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBehaviorExecutor = exports.registerBehaviorExecutor = void 0;
let _behaviorExecutor = undefined;
function registerBehaviorExecutor(behaviorExecutor) {
    if (_behaviorExecutor !== undefined) {
        throw new Error('Cannot re-register the behavior executor.');
    }
    _behaviorExecutor = behaviorExecutor;
}
exports.registerBehaviorExecutor = registerBehaviorExecutor;
function getBehaviorExecutor() {
    if (_behaviorExecutor === undefined) {
        throw new Error('no behavior executor registered.');
    }
    return _behaviorExecutor;
}
exports.getBehaviorExecutor = getBehaviorExecutor;
