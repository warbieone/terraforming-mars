"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointLuna = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class PointLuna extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.CORPORATION,
            name: CardName_1.CardName.POINT_LUNA,
            tags: [Tag_1.Tag.SPACE, Tag_1.Tag.EARTH],
            startingMegaCredits: 38,
            behavior: {
                production: { titanium: 1 },
                drawCard: 1,
            },
            metadata: {
                cardNumber: 'R10',
                description: 'You start with 1 titanium production and 38 M€.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.br;
                    b.production((pb) => pb.titanium(1)).nbsp.megacredits(38);
                    b.corpBox('effect', (ce) => {
                        ce.effect('When you play an Earth tag, including this, draw a card.', (eb) => {
                            eb.earth(1, { played: Options_1.played }).startEffect.cards(1);
                        });
                    });
                }),
            },
        });
    }
    onCorpCardPlayed(player, card) {
        return this.onCardPlayed(player, card);
    }
    onCardPlayed(player, card) {
        if (player.isCorporation(this.name)) {
            const tagCount = player.tags.cardTagCount(card, Tag_1.Tag.EARTH);
            if (tagCount > 0) {
                player.drawCard(tagCount);
            }
        }
        return undefined;
    }
}
exports.PointLuna = PointLuna;
