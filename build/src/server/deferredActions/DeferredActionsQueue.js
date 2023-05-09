"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeferredActionsQueue = void 0;
const GiveColonyBonus_1 = require("./GiveColonyBonus");
class DeferredActionsQueue {
    constructor() {
        this.insertId = 0;
        this.queue = [];
    }
    get length() {
        return this.queue.length;
    }
    push(action) {
        action.queueId = this.insertId++;
        this.queue.push(action);
    }
    runAllFor(player, cb) {
        let b;
        let j = -1;
        for (let i = this.queue.length - 1; i >= 0; i--) {
            const a = this.queue[i];
            if (a.player.id === player.id && (b === undefined || this.hasHigherPriority(a, b))) {
                b = a;
                j = i;
            }
        }
        if (b === undefined) {
            cb();
            return;
        }
        this.queue.splice(j, 1);
        this.run(b, () => this.runAllFor(player, cb));
    }
    hasHigherPriority(a, b) {
        return a.priority < b.priority || (a.priority === b.priority && a.queueId < b.queueId);
    }
    nextItemIndex() {
        if (this.queue.length === 0) {
            return -1;
        }
        let b = this.queue[0];
        let j = 0;
        for (let i = this.queue.length - 1; i >= 1; i--) {
            const a = this.queue[i];
            if (this.hasHigherPriority(a, b)) {
                b = a;
                j = i;
            }
        }
        return j;
    }
    runAll(cb) {
        const next = this.nextItemIndex();
        const action = this.queue[next];
        if (action === undefined) {
            cb();
            return;
        }
        this.queue.splice(next, 1);
        this.run(action, () => this.runAll(cb));
    }
    peek() {
        return this.queue[this.nextItemIndex()];
    }
    pop() {
        return this.queue.splice(this.nextItemIndex(), 1)[0];
    }
    run(action, cb) {
        if (action instanceof GiveColonyBonus_1.GiveColonyBonus) {
            action.cb = cb;
            action.execute();
            return;
        }
        const input = action.execute();
        if (input !== undefined) {
            action.player.setWaitingFor(input, cb);
        }
        else {
            cb();
        }
    }
    runNext() {
        const action = this.pop();
        if (action !== undefined) {
            this.run(action, () => { });
        }
    }
}
exports.DeferredActionsQueue = DeferredActionsQueue;
