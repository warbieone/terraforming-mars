"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValleyTrust = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
const PreludesExpansion_1 = require("../../preludes/PreludesExpansion");
class ValleyTrust extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.CORPORATION,
            name: CardName_1.CardName.VALLEY_TRUST,
            tags: [Tag_1.Tag.EARTH],
            startingMegaCredits: 37,
            initialActionText: 'Draw 3 Prelude cards, and play one of them',
            cardDiscount: { tag: Tag_1.Tag.SCIENCE, amount: 2 },
            metadata: {
                cardNumber: 'R34',
                description: 'You start with 37 M€. As your first action, draw 3 Prelude cards, and play one of them. Discard the other two.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.br.br;
                    b.megacredits(37).nbsp.prelude().asterix();
                    b.corpBox('effect', (ce) => {
                        ce.effect('When you play a science tag, you pay 2M€ less for it.', (eb) => {
                            eb.science(1, { played: Options_1.played }).startEffect.megacredits(-2);
                        });
                    });
                }),
            },
        });
    }
    getCardDiscount(player, card) {
        return player.tags.cardTagCount(card, Tag_1.Tag.SCIENCE) * 2;
    }
    initialAction(player) {
        const game = player.game;
        const cards = [
            game.preludeDeck.draw(game),
            game.preludeDeck.draw(game),
            game.preludeDeck.draw(game),
        ];
        PreludesExpansion_1.PreludesExpansion.chooseAndPlayPrelude(player, cards);
        return undefined;
    }
}
exports.ValleyTrust = ValleyTrust;
//# sourceMappingURL=ValleyTrust.js.map