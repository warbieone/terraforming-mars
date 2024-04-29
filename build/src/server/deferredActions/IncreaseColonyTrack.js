"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncreaseColonyTrack = void 0;
const OrOptions_1 = require("../inputs/OrOptions");
const SelectOption_1 = require("../inputs/SelectOption");
const DeferredAction_1 = require("./DeferredAction");
const Priority_1 = require("./Priority");
const LogHelper_1 = require("../LogHelper");
const MessageBuilder_1 = require("../logs/MessageBuilder");
class IncreaseColonyTrack extends DeferredAction_1.DeferredAction {
    constructor(player, colony, steps, title = (0, MessageBuilder_1.message)('Increase ${0} colony track before trade', (b) => b.colony(colony))) {
        super(player, Priority_1.Priority.INCREASE_COLONY_TRACK);
        this.colony = colony;
        this.steps = steps;
        this.title = title;
    }
    execute() {
        if (this.steps === 0) {
            this.cb(undefined);
            return undefined;
        }
        const options = new OrOptions_1.OrOptions();
        for (let step = this.steps; step > 0; step--) {
            options.options.push(new SelectOption_1.SelectOption((0, MessageBuilder_1.message)('Increase colony track ${0} step(s)', (b) => b.number(step)))
                .andThen(() => {
                this.colony.increaseTrack(step);
                LogHelper_1.LogHelper.logColonyTrackIncrease(this.player, this.colony, step);
                this.cb(undefined);
                return undefined;
            }));
        }
        options.title = this.title;
        options.options.push(new SelectOption_1.SelectOption('Don\'t increase colony track').andThen(() => {
            this.cb(undefined);
            return undefined;
        }));
        return options;
    }
}
exports.IncreaseColonyTrack = IncreaseColonyTrack;
