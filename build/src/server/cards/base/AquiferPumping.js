"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AquiferPumping = exports.OCEAN_COST = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const SelectPaymentDeferred_1 = require("../../deferredActions/SelectPaymentDeferred");
const PlaceOceanTile_1 = require("../../deferredActions/PlaceOceanTile");
const CardRenderer_1 = require("../render/CardRenderer");
const titles_1 = require("../../inputs/titles");
exports.OCEAN_COST = 8;
class AquiferPumping extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.AQUIFER_PUMPING,
            tags: [Tag_1.Tag.BUILDING],
            cost: 18,
            metadata: {
                cardNumber: '187',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Spend 8 M€ to place 1 ocean tile. STEEL MAY BE USED as if you were playing a building card.', (eb) => eb.megacredits(8).super((b) => b.steel(1)).startAction.oceans(1));
                }),
            },
        });
    }
    canAct(player) {
        return player.canAfford({ cost: exports.OCEAN_COST, steel: true, tr: { oceans: 1 } });
    }
    action(player) {
        player.game.defer(new SelectPaymentDeferred_1.SelectPaymentDeferred(player, 8, { canUseSteel: true, title: titles_1.TITLES.payForCardAction(this.name) }))
            .andThen(() => player.game.defer(new PlaceOceanTile_1.PlaceOceanTile(player)));
        return undefined;
    }
}
exports.AquiferPumping = AquiferPumping;
