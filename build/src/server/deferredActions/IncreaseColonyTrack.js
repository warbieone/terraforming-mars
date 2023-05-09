"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncreaseColonyTrack = void 0;
const OrOptions_1 = require("../inputs/OrOptions");
const SelectOption_1 = require("../inputs/SelectOption");
const DeferredAction_1 = require("./DeferredAction");
const LogHelper_1 = require("../LogHelper");
class IncreaseColonyTrack extends DeferredAction_1.DeferredAction {
    constructor(player, colony, steps, cb, title = 'Increase ' + colony.name + ' colony track before trade') {
        super(player, DeferredAction_1.Priority.INCREASE_COLONY_TRACK);
        this.colony = colony;
        this.steps = steps;
        this.cb = cb;
        this.title = title;
    }
    execute() {
        if (this.steps === 0) {
            this.cb();
            return undefined;
        }
        const options = new OrOptions_1.OrOptions();
        for (let step = this.steps; step > 0; step--) {
            options.options.push(new SelectOption_1.SelectOption('Increase colony track ' + step + ' step(s)', 'Confirm', () => {
                this.colony.increaseTrack(step);
                LogHelper_1.LogHelper.logColonyTrackIncrease(this.player, this.colony, step);
                this.cb();
                return undefined;
            }));
        }
        options.title = this.title;
        options.options.push(new SelectOption_1.SelectOption('Don\'t increase colony track', 'Confirm', () => {
            this.cb();
            return undefined;
        }));
        return options;
    }
}
exports.IncreaseColonyTrack = IncreaseColonyTrack;
