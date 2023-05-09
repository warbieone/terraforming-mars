"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HugeAsteroid = void 0;
const PreludeCard_1 = require("./PreludeCard");
const CardName_1 = require("../../../common/cards/CardName");
const SelectPaymentDeferred_1 = require("../../deferredActions/SelectPaymentDeferred");
const CardRenderer_1 = require("../render/CardRenderer");
class HugeAsteroid extends PreludeCard_1.PreludeCard {
    constructor() {
        super({
            name: CardName_1.CardName.HUGE_ASTEROID,
            startingMegacredits: -5,
            behavior: {
                global: { temperature: 3 },
            },
            metadata: {
                cardNumber: 'P15',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.temperature(3).br;
                    b.megacredits(-5);
                }),
                description: 'Increase temperature 3 steps. Pay 5 M€.',
            },
        });
    }
    bespokeCanPlay(player) {
        return player.canAfford(5);
    }
    bespokePlay(player) {
        player.game.defer(new SelectPaymentDeferred_1.SelectPaymentDeferred(player, 5));
        return undefined;
    }
}
exports.HugeAsteroid = HugeAsteroid;
