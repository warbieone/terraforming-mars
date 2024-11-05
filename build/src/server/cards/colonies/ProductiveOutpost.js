"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductiveOutpost = void 0;
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
const Size_1 = require("../../../common/cards/render/Size");
const ColonyName_1 = require("../../../common/colonies/ColonyName");
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
        const value = (c) => {
            if (c.name === ColonyName_1.ColonyName.TITANIA) {
                return 1;
            }
            if (c.name === ColonyName_1.ColonyName.LEAVITT) {
                return -1;
            }
            return 0;
        };
        const sorted = [...player.game.colonies].sort((a, b) => value(b) - value(a));
        sorted.forEach((colony) => {
            colony.colonies.filter((owner) => owner === player.id).forEach((owner) => {
                player.defer(() => colony.giveColonyBonus(player.game.getPlayerById(owner)));
            });
        });
        return undefined;
    }
}
exports.ProductiveOutpost = ProductiveOutpost;
