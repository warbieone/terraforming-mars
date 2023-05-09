"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductiveOutpost = void 0;
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const DeferredAction_1 = require("../../deferredActions/DeferredAction");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
const Size_1 = require("../../../common/cards/render/Size");
class ProductiveOutpost extends Card_1.Card {
    constructor() {
        super({
            cost: 0,
            name: CardName_1.CardName.PRODUCTIVE_OUTPOST,
            type: CardType_1.CardType.AUTOMATED,
            metadata: {
                cardNumber: 'C30',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.text('Gain all your colony bonuses.', Size_1.Size.SMALL, true);
                }),
            },
        });
    }
    bespokePlay(player) {
        player.game.colonies.forEach((colony) => {
            colony.colonies.filter((owner) => owner === player.id).forEach((owner) => {
                player.game.defer(new DeferredAction_1.SimpleDeferredAction(player, () => colony.giveColonyBonus(player.game.getPlayerById(owner))));
            });
        });
        return undefined;
    }
}
exports.ProductiveOutpost = ProductiveOutpost;
