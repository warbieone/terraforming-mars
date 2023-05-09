"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WaterImportFromEuropa = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const PlaceOceanTile_1 = require("../../deferredActions/PlaceOceanTile");
const SelectPaymentDeferred_1 = require("../../deferredActions/SelectPaymentDeferred");
const CardRenderer_1 = require("../render/CardRenderer");
const ACTION_COST = 12;
class WaterImportFromEuropa extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.WATER_IMPORT_FROM_EUROPA,
            tags: [Tag_1.Tag.JOVIAN, Tag_1.Tag.SPACE],
            cost: 25,
            victoryPoints: { tag: Tag_1.Tag.JOVIAN },
            metadata: {
                cardNumber: '012',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Pay 12 M€ to place an ocean tile. TITANIUM MAY BE USED as if playing a space card.', (eb) => {
                        eb.megacredits(12).openBrackets.titanium(1).closeBrackets.startAction.oceans(1);
                    }).br;
                    b.vpText('1 VP for each Jovian tag you have.');
                }),
            },
        });
    }
    canAct(player) {
        return player.canAfford(ACTION_COST, { titanium: true, tr: { oceans: 1 } });
    }
    action(player) {
        player.game.defer(new SelectPaymentDeferred_1.SelectPaymentDeferred(player, ACTION_COST, { canUseTitanium: true, title: 'Select how to pay for action', afterPay: () => {
                player.game.defer(new PlaceOceanTile_1.PlaceOceanTile(player));
            } }));
        return undefined;
    }
}
exports.WaterImportFromEuropa = WaterImportFromEuropa;
