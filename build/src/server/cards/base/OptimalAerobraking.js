"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptimalAerobraking = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class OptimalAerobraking extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.OPTIMAL_AEROBRAKING,
            tags: [Tag_1.Tag.SPACE],
            cost: 7,
            metadata: {
                cardNumber: '031',
                renderData: CardRenderer_1.CardRenderer.builder((b) => b.effect('When you play a space event, you gain 3 M€ and 3 heat.', (be) => {
                    be.space({ played: Options_1.played }).event({ played: Options_1.played }).startEffect.megacredits(3).heat(3);
                })),
            },
        });
    }
    onCardPlayed(player, card) {
        if (card.type === CardType_1.CardType.EVENT && card.tags.includes(Tag_1.Tag.SPACE)) {
            player.megaCredits += 3;
            player.heat += 3;
        }
    }
}
exports.OptimalAerobraking = OptimalAerobraking;
//# sourceMappingURL=OptimalAerobraking.js.map