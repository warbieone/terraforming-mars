"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveAnyPlants = void 0;
const Resource_1 = require("../../common/Resource");
const OrOptions_1 = require("../inputs/OrOptions");
const SelectOption_1 = require("../inputs/SelectOption");
const DeferredAction_1 = require("./DeferredAction");
const Priority_1 = require("./Priority");
const CardName_1 = require("../../common/cards/CardName");
const MessageBuilder_1 = require("../logs/MessageBuilder");
class RemoveAnyPlants extends DeferredAction_1.DeferredAction {
    constructor(player, count = 1, title) {
        super(player, Priority_1.Priority.ATTACK_OPPONENT);
        this.count = count;
        this.title = title ?? (0, MessageBuilder_1.message)('Select player to remove up to ${0} plants', (b) => b.number(count));
    }
    createOption(target) {
        let qtyToRemove = Math.min(target.plants, this.count);
        if (target.cardIsInEffect(CardName_1.CardName.BOTANICAL_EXPERIENCE)) {
            qtyToRemove = Math.ceil(qtyToRemove / 2);
        }
        const message = new MessageBuilder_1.MessageBuilder('Remove ${0} plants from ${1}')
            .number(qtyToRemove)
            .player(target)
            .getMessage();
        return new SelectOption_1.SelectOption(message, 'Remove plants').andThen(() => {
            target.maybeBlockAttack(this.player, (proceed) => {
                if (proceed === true) {
                    target.stock.deduct(Resource_1.Resource.PLANTS, qtyToRemove, { log: true, from: this.player });
                }
                return undefined;
            });
            return undefined;
        });
    }
    execute() {
        if (this.player.game.isSoloMode()) {
            this.player.game.someoneHasRemovedOtherPlayersPlants = true;
            this.player.resolveInsuranceInSoloGame();
            return undefined;
        }
        const candidates = this.player.getOpponents().filter((p) => !p.plantsAreProtected() && p.plants > 0);
        if (candidates.length === 0) {
            return undefined;
        }
        const removalOptions = candidates.map((target) => {
            let qtyToRemove = Math.min(target.plants, this.count);
            if (target.cardIsInEffect(CardName_1.CardName.BOTANICAL_EXPERIENCE)) {
                qtyToRemove = Math.ceil(qtyToRemove / 2);
            }
            const message = new MessageBuilder_1.MessageBuilder('Remove ${0} plants from ${1}')
                .number(qtyToRemove)
                .player(target)
                .getMessage();
            return new SelectOption_1.SelectOption(message, {
                buttonLabel: 'Remove plants',
                warnings: (target === this.player) ? ['removeOwnPlants'] : undefined,
            }).andThen(() => {
                target.maybeBlockAttack(this.player, (proceed) => {
                    if (proceed === true) {
                        target.stock.deduct(Resource_1.Resource.PLANTS, qtyToRemove, { log: true, from: this.player });
                    }
                    return undefined;
                });
                return undefined;
            });
        });
        removalOptions.push(new SelectOption_1.SelectOption('Skip removing plants').andThen(() => {
            return undefined;
        }));
        if (this.player.plants > 0) {
            const option = this.createOption(this.player);
            option.warnings = ['removeOwnPlants'];
            removalOptions.push(option);
        }
        const orOptions = new OrOptions_1.OrOptions(...removalOptions);
        orOptions.title = this.title;
        return orOptions;
    }
}
exports.RemoveAnyPlants = RemoveAnyPlants;
