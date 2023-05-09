"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TradeAdvance = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const PreludeCard_1 = require("../prelude/PreludeCard");
const CardName_1 = require("../../../common/cards/CardName");
const DeferredAction_1 = require("../../deferredActions/DeferredAction");
const CardRenderer_1 = require("../render/CardRenderer");
class TradeAdvance extends PreludeCard_1.PreludeCard {
    constructor() {
        super({
            name: CardName_1.CardName.TRADE_ADVANCE,
            tags: [Tag_1.Tag.EARTH],
            behavior: {
                stock: { megacredits: 2 },
            },
            metadata: {
                cardNumber: 'Y05',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.megacredits(2).text('[ solo').colon().megacredits(10).text(']').br;
                    b.text('Trade all colonies with').br;
                    b.trade().colon().text('+1');
                }),
                description: 'Gain 2 M€ [SOLO: Gain 10 M€]. Immediately trade with all active colonies. You may increase the Colony Tile track 1 step before each of these trades.',
            },
        });
    }
    bespokePlay(player) {
        player.game.defer(new DeferredAction_1.SimpleDeferredAction(player, () => {
            const openColonies = player.game.colonies.filter((colony) => colony.isActive);
            openColonies.forEach((colony) => {
                colony.trade(player, { usesTradeFleet: false }, 1);
            });
            return undefined;
        }));
        if (player.game.isSoloMode()) {
            player.megaCredits += 8;
        }
        return undefined;
    }
}
exports.TradeAdvance = TradeAdvance;
