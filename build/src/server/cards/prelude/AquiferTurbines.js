"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AquiferTurbines = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const PreludeCard_1 = require("./PreludeCard");
const CardName_1 = require("../../../common/cards/CardName");
const SelectPaymentDeferred_1 = require("../../deferredActions/SelectPaymentDeferred");
const CardRenderer_1 = require("../render/CardRenderer");
class AquiferTurbines extends PreludeCard_1.PreludeCard {
    constructor() {
        super({
            name: CardName_1.CardName.AQUIFER_TURBINES,
            tags: [Tag_1.Tag.POWER],
            behavior: {
                production: { energy: 2 },
                ocean: {},
            },
            startingMegacredits: -3,
            metadata: {
                cardNumber: 'P02',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.oceans(1).production((pb) => pb.energy(2)).br;
                    b.megacredits(-3);
                }),
                description: 'Place an ocean tile. Increase your energy production 2 steps. Pay 3 M€.',
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
exports.AquiferTurbines = AquiferTurbines;
