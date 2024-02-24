"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessEmpire = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const PreludeCard_1 = require("./PreludeCard");
const CardName_1 = require("../../../common/cards/CardName");
const SelectPaymentDeferred_1 = require("../../deferredActions/SelectPaymentDeferred");
const CardRenderer_1 = require("../render/CardRenderer");
class BusinessEmpire extends PreludeCard_1.PreludeCard {
    constructor() {
        super({
            name: CardName_1.CardName.BUSINESS_EMPIRE,
            tags: [Tag_1.Tag.EARTH],
            behavior: {
                production: { megacredits: 6 },
            },
            startingMegacredits: -6,
            metadata: {
                cardNumber: 'P06',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.megacredits(6)).br;
                    b.megacredits(-6);
                }),
                description: 'Increase your M€ production 6 steps. Pay 6 M€.',
            },
        });
    }
    bespokeCanPlay(player) {
        if (player.isCorporation(CardName_1.CardName.MANUTECH))
            return true;
        return player.canAfford(6);
    }
    bespokePlay(player) {
        player.game.defer(new SelectPaymentDeferred_1.SelectPaymentDeferred(player, 6));
        return undefined;
    }
}
exports.BusinessEmpire = BusinessEmpire;
