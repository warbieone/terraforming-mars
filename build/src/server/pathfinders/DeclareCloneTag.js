"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeclareCloneTag = void 0;
const DeferredAction_1 = require("../deferredActions/DeferredAction");
const OrOptions_1 = require("../inputs/OrOptions");
const SelectOption_1 = require("../inputs/SelectOption");
const PathfindersData_1 = require("../pathfinders/PathfindersData");
const utils_1 = require("../../common/utils/utils");
class DeclareCloneTag extends DeferredAction_1.DeferredAction {
    constructor(player, card, cb = () => { }, title = '') {
        super(player, DeferredAction_1.Priority.DECLARE_CLONE_TAG);
        this.card = card;
        this.cb = cb;
        this.title = title;
        if (this.title === '') {
            this.title = `Assign the clone tag for ${card.name}`;
        }
    }
    execute() {
        const tags = (0, utils_1.intersection)(PathfindersData_1.PLANETARY_TAGS, this.player.game.tags.filter(PathfindersData_1.isPlanetaryTag));
        const options = tags.map((tag) => {
            return new SelectOption_1.SelectOption(tag, 'Choose', () => {
                this.card.cloneTag = tag;
                this.player.game.log('${0} turned the clone tag on ${1} into a ${2} tag', (b) => b.player(this.player).card(this.card).string(tag));
                this.player.onCardPlayed(this.card);
                this.cb(tag);
                return undefined;
            });
        });
        const orOptions = new OrOptions_1.OrOptions(...options);
        orOptions.title = 'Select a new tag for this clone tag.';
        return orOptions;
    }
}
exports.DeclareCloneTag = DeclareCloneTag;
