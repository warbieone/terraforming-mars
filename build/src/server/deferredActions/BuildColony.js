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
        var _a, _b, _c, _d;
        const colonies = ((_a = this.options) === null || _a === void 0 ? void 0 : _a.colonies) || this.player.colonies.getPlayableColonies((_b = this.options) === null || _b === void 0 ? void 0 : _b.allowDuplicate);
        if (colonies.length === 0) {
            return undefined;
        }
        const title = (_d = (_c = this.options) === null || _c === void 0 ? void 0 : _c.title) !== null && _d !== void 0 ? _d : 'Select where to build a colony';
        return new SelectColony_1.SelectColony(title, 'Build', colonies, (colony) => {
            var _a, _b, _c, _d;
            colony.addColony(this.player, { giveBonusTwice: (_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.giveBonusTwice) !== null && _b !== void 0 ? _b : false });
            (_d = (_c = this.options) === null || _c === void 0 ? void 0 : _c.cb) === null || _d === void 0 ? void 0 : _d.call(_c, colony);
            return undefined;
        });
    }
}
exports.BuildColony = BuildColony;
