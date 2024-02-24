"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocietySupport = void 0;
const PreludeCard_1 = require("./PreludeCard");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Tag_1 = require("../../../common/cards/Tag");
const SelectPaymentDeferred_1 = require("../../deferredActions/SelectPaymentDeferred");
class SocietySupport extends PreludeCard_1.PreludeCard {
    constructor() {
        super({
            name: CardName_1.CardName.SOCIETY_SUPPORT,
            tags: [Tag_1.Tag.WILD],
            startingMegacredits: -2,
            behavior: {
                production: { plants: 1, energy: 1, heat: 1 },
            },
            metadata: {
                cardNumber: 'P31',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => {
                        pb.plants(1).energy(1).heat(1);
                        b.megacredits(-2);
                    });
                }),
                description: 'Increase your plant, energy and heat production 1 step. Pay 3 M€.',
            },
        });
    }
    bespokeCanPlay(player) {
        return player.canAfford(3);
    }
    bespokePlay(player) {
        player.game.defer(new SelectPaymentDeferred_1.SelectPaymentDeferred(player, 3));
        return undefined;
    }
}
exports.SocietySupport = SocietySupport;
