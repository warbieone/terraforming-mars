"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeclareCloneTag = void 0;
const DeferredAction_1 = require("../deferredActions/DeferredAction");
const Priority_1 = require("../deferredActions/Priority");
const OrOptions_1 = require("../inputs/OrOptions");
const SelectOption_1 = require("../inputs/SelectOption");
const PathfindersData_1 = require("../pathfinders/PathfindersData");
const utils_1 = require("../../common/utils/utils");
const MessageBuilder_1 = require("../logs/MessageBuilder");
class DeclareCloneTag extends DeferredAction_1.DeferredAction {
    constructor(player, card, title = undefined) {
        super(player, Priority_1.Priority.DECLARE_CLONE_TAG);
        this.card = card;
        this.title = title;
    }
    execute() {
        const tags = (0, utils_1.intersection)(PathfindersData_1.PLANETARY_TAGS, this.player.game.tags.filter(PathfindersData_1.isPlanetaryTag));
        const options = tags.map((tag) => {
            return new SelectOption_1.SelectOption(tag, 'Choose').andThen(() => {
                this.card.cloneTag = tag;
                this.player.game.log('${0} turned the clone tag on ${1} into a ${2} tag', (b) => b.player(this.player).card(this.card).string(tag));
                this.player.onCardPlayed(this.card);
                this.cb(tag);
                return undefined;
            });
        });
        const orOptions = new OrOptions_1.OrOptions(...options);
        if (this.title === undefined) {
            this.title = (0, MessageBuilder_1.message)('Assign the clone tag for ${0}', (b) => b.cardName(this.card.name));
        }
        orOptions.title = this.title;
        return orOptions;
    }
}
exports.DeclareCloneTag = DeclareCloneTag;
