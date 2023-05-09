"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Meltworks = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class Meltworks extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.MELTWORKS,
            tags: [Tag_1.Tag.BUILDING],
            cost: 4,
            metadata: {
                cardNumber: 'X26',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Spend 5 heat to gain 3 steel.', (eb) => {
                        eb.heat(5, { digit: Options_1.digit }).startAction.steel(3);
                    });
                }),
            },
        });
    }
    canAct(player) {
        return player.availableHeat() >= 5;
    }
    action(player) {
        return player.spendHeat(5, () => {
            player.steel += 3;
            return undefined;
        });
    }
}
exports.Meltworks = Meltworks;
