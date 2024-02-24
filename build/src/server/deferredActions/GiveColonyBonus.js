"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GiveColonyBonus = void 0;
const DeferredAction_1 = require("./DeferredAction");
const mnemonist_1 = require("mnemonist");
class GiveColonyBonus extends DeferredAction_1.DeferredAction {
    constructor(player, colony, selfish = false) {
        super(player, DeferredAction_1.Priority.DEFAULT);
        this.colony = colony;
        this.selfish = selfish;
        this.waitingFor = new mnemonist_1.MultiSet();
        this.playersWithBonuses = new Set();
    }
    execute() {
        if (this.colony.colonies.length === 0) {
            this.cb(undefined);
            return undefined;
        }
        for (const playerId of this.colony.colonies) {
            if (!this.selfish) {
                this.waitingFor.add(playerId);
                this.playersWithBonuses.add(playerId);
            }
            else {
                this.waitingFor.add(this.player.id);
                this.playersWithBonuses.add(this.player.id);
            }
        }
        for (const playerId of this.waitingFor.keys()) {
            const bonusPlayer = this.player.game.getPlayerById(playerId);
            this.giveColonyBonus(bonusPlayer);
        }
        return undefined;
    }
    giveColonyBonus(player) {
        if (this.waitingFor.get(player.id) ?? 0 > 0) {
            this.waitingFor.remove(player.id);
            const input = this.colony.giveColonyBonus(player, true);
            if (input !== undefined) {
                player.setWaitingFor(input, () => this.giveColonyBonus(player));
            }
            else {
                this.giveColonyBonus(player);
            }
        }
        else {
            this.playersWithBonuses.delete(player.id);
            this.doneGettingBonus();
        }
    }
    doneGettingBonus() {
        if (this.playersWithBonuses.size === 0) {
            this.cb(undefined);
        }
    }
}
exports.GiveColonyBonus = GiveColonyBonus;
