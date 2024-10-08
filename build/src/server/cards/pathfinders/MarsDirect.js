"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarsDirect = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CorporationCard_1 = require("../corporation/CorporationCard");
const CardRenderer_1 = require("../render/CardRenderer");
const Tag_1 = require("../../../common/cards/Tag");
class MarsDirect extends CorporationCard_1.CorporationCard {
    constructor() {
        super({
            name: CardName_1.CardName.MARS_DIRECT,
            tags: [Tag_1.Tag.MARS],
            startingMegaCredits: 52,
            metadata: {
                description: 'You start with 52 M€.',
                cardNumber: 'PFC11',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.megacredits(52).br;
                    b.corpBox('effect', (ce) => {
                        ce.effect('When you play a Mars tag, you pay 1 M€ less for each Mars tag you have.', (eb) => {
                            eb.tag(Tag_1.Tag.MARS).startEffect.megacredits(1).slash().tag(Tag_1.Tag.MARS);
                        });
                    });
                }),
            },
        });
    }
    getCardDiscount(player, card) {
        if (card.tags.indexOf(Tag_1.Tag.MARS) === -1) {
            return 0;
        }
        return player.tags.count(Tag_1.Tag.MARS);
    }
}
exports.MarsDirect = MarsDirect;
