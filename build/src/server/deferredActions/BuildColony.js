"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildColony = void 0;
const SelectColony_1 = require("../inputs/SelectColony");
const DeferredAction_1 = require("./DeferredAction");
class BuildColony extends DeferredAction_1.DeferredAction {
    constructor(player, options) {
        super(player, DeferredAction_1.Priority.BUILD_COLONY);
        this.options = options;
    }
    execute() {
        const colonies = this.options?.colonies || this.player.colonies.getPlayableColonies(this.options?.allowDuplicate);
        if (colonies.length === 0) {
            return undefined;
        }
        const title = this.options?.title ?? 'Select where to build a colony';
        return new SelectColony_1.SelectColony(title, 'Build', colonies)
            .andThen((colony) => {
            colony.addColony(this.player, { giveBonusTwice: this.options?.giveBonusTwice ?? false });
            this.cb(colony);
            return undefined;
        });
    }
}
exports.BuildColony = BuildColony;
