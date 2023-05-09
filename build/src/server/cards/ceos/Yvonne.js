"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Yvonne = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const CeoCard_1 = require("./CeoCard");
const DeferredAction_1 = require("../../deferredActions/DeferredAction");
const Size_1 = require("../../../common/cards/render/Size");
class Yvonne extends CeoCard_1.CeoCard {
    constructor() {
        super({
            name: CardName_1.CardName.YVONNE,
            metadata: {
                cardNumber: 'L25',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.opgArrow().text('GAIN ALL YOUR COLONY BONUSES TWICE', Size_1.Size.SMALL);
                }),
                description: 'Once per game, gain all your colony bonuses twice.',
            },
        });
    }
    canAct(player) {
        if (!super.canAct(player)) {
            return false;
        }
        return player.game.gameOptions.coloniesExtension === true;
    }
    action(player) {
        this.isDisabled = true;
        player.game.colonies.forEach((colony) => {
            colony.colonies.filter((owner) => owner === player.id).forEach((owner) => {
                player.game.defer(new DeferredAction_1.SimpleDeferredAction(player, () => colony.giveColonyBonus(player.game.getPlayerById(owner))));
                player.game.defer(new DeferredAction_1.SimpleDeferredAction(player, () => colony.giveColonyBonus(player.game.getPlayerById(owner))));
            });
        });
        return undefined;
    }
}
exports.Yvonne = Yvonne;
