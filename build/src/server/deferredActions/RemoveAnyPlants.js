"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveAnyPlants = void 0;
const Resource_1 = require("../../common/Resource");
const OrOptions_1 = require("../inputs/OrOptions");
const SelectOption_1 = require("../inputs/SelectOption");
const DeferredAction_1 = require("./DeferredAction");
const CardName_1 = require("../../common/cards/CardName");
const MessageBuilder_1 = require("../logs/MessageBuilder");
class RemoveAnyPlants extends DeferredAction_1.DeferredAction {
    constructor(player, count = 1, title) {
        super(player, DeferredAction_1.Priority.ATTACK_OPPONENT);
        this.count = count;
        this.title = title !== null && title !== void 0 ? title : (0, MessageBuilder_1.newMessage)('Select player to remove up to ${0} plants', (b) => b.number(count));
    }
    execute() {
        if (this.player.game.isSoloMode()) {
            this.player.game.someoneHasRemovedOtherPlayersPlants = true;
            this.player.resolveInsuranceInSoloGame();
            return undefined;
        }
        const candidates = this.player.game.getPlayers().filter((p) => p.id !== this.player.id && !p.plantsAreProtected() && p.plants > 0);
        if (candidates.length === 0) {
            return undefined;
        }
        const removalOptions = candidates.map((candidate) => {
            let qtyToRemove = Math.min(candidate.plants, this.count);
            if (candidate.cardIsInEffect(CardName_1.CardName.BOTANICAL_EXPERIENCE)) {
                qtyToRemove = Math.ceil(qtyToRemove / 2);
            }
            const message = new MessageBuilder_1.MessageBuilder('Remove ${0} plants from ${1}')
                .number(qtyToRemove)
                .rawString(candidate.name)
                .getMessage();
            return new SelectOption_1.SelectOption(message, 'Remove plants', () => {
                candidate.deductResource(Resource_1.Resource.PLANTS, qtyToRemove, { log: true, from: this.player });
                return undefined;
            });
        });
        const orOptions = new OrOptions_1.OrOptions(...removalOptions, new SelectOption_1.SelectOption('Skip removing plants', 'Confirm', () => {
            return undefined;
        }));
        orOptions.title = this.title;
        return orOptions;
    }
}
exports.RemoveAnyPlants = RemoveAnyPlants;
