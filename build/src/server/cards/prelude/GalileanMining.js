"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GalileanMining = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const PreludeCard_1 = require("./PreludeCard");
const CardName_1 = require("../../../common/cards/CardName");
const SelectPaymentDeferred_1 = require("../../deferredActions/SelectPaymentDeferred");
const CardRenderer_1 = require("../../cards/render/CardRenderer");
class GalileanMining extends PreludeCard_1.PreludeCard {
    constructor() {
        super({
            name: CardName_1.CardName.GALILEAN_MINING,
            tags: [Tag_1.Tag.JOVIAN],
            behavior: {
                production: { titanium: 2 },
            },
            startingMegacredits: -5,
            metadata: {
                cardNumber: 'P13',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => {
                        pb.titanium(2);
                    }).br;
                    b.megacredits(-5);
                }),
                description: 'Increase your titanium production 2 steps. Pay 5 M€.',
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
exports.GalileanMining = GalileanMining;
