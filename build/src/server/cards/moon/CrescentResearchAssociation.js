"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrescentResearchAssociation = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardRenderer_1 = require("../render/CardRenderer");
const Tag_1 = require("../../../common/cards/Tag");
class CrescentResearchAssociation extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.CORPORATION,
            name: CardName_1.CardName.CRESCENT_RESEARCH_ASSOCIATION,
            tags: [Tag_1.Tag.SCIENCE, Tag_1.Tag.MOON],
            startingMegaCredits: 50,
            victoryPoints: { tag: Tag_1.Tag.MOON, per: 3 },
            metadata: {
                description: 'You start with 50 M€. 1 VP for every 3 Moon tags you have.',
                cardNumber: '',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.megacredits(50).br;
                    b.effect('When you play a Moon tag, you pay 1 M€ less for each Moon tag you have.', (eb) => {
                        eb.moon().startEffect.megacredits(1).slash().moon();
                    });
                }),
            },
        });
    }
    getCardDiscount(player, card) {
        if (card.tags.indexOf(Tag_1.Tag.MOON) === -1) {
            return 0;
        }
        return player.tags.count(Tag_1.Tag.MOON);
    }
}
exports.CrescentResearchAssociation = CrescentResearchAssociation;
