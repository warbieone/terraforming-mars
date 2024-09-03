"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrescentResearchAssociation = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CorporationCard_1 = require("../corporation/CorporationCard");
const CardRenderer_1 = require("../render/CardRenderer");
const Tag_1 = require("../../../common/cards/Tag");
class CrescentResearchAssociation extends CorporationCard_1.CorporationCard {
    constructor() {
        super({
            name: CardName_1.CardName.CRESCENT_RESEARCH_ASSOCIATION,
            tags: [Tag_1.Tag.SCIENCE, Tag_1.Tag.MOON],
            startingMegaCredits: 50,
            victoryPoints: { tag: Tag_1.Tag.MOON, per: 3 },
            metadata: {
                description: 'You start with 50 M€. 1 VP for every 3 Moon tags you have.',
                cardNumber: 'MC5',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.megacredits(50).br;
                    b.effect('When you play a Moon tag, you pay 1 M€ less for each Moon tag you have.', (eb) => {
                        eb.tag(Tag_1.Tag.MOON).startEffect.megacredits(1).slash().tag(Tag_1.Tag.MOON);
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
