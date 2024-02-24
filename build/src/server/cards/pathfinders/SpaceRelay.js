"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpaceRelay = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Tag_1 = require("../../../common/cards/Tag");
const Options_1 = require("../Options");
class SpaceRelay extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.SPACE_RELAY,
            cost: 13,
            tags: [Tag_1.Tag.SPACE, Tag_1.Tag.JOVIAN],
            behavior: {
                production: { megacredits: 1 },
            },
            metadata: {
                cardNumber: 'Pf33',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.effect('Whenever you play a card with a Jovian tag, including this, draw a card.', (eb) => {
                        eb.jovian({ amount: 1, played: Options_1.played }).startEffect.cards(1);
                    }).br;
                    b.production((pb) => pb.megacredits(1));
                }),
                description: 'Increase your M€ production 1 step.',
            },
        });
    }
    onCardPlayed(player, card) {
        if (card.tags.includes(Tag_1.Tag.JOVIAN)) {
            player.drawCard();
        }
    }
}
exports.SpaceRelay = SpaceRelay;
