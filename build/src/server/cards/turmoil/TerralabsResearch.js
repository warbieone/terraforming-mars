"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TerralabsResearch = void 0;
const CorporationCard_1 = require("../corporation/CorporationCard");
const Tag_1 = require("../../../common/cards/Tag");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class TerralabsResearch extends CorporationCard_1.CorporationCard {
    constructor() {
        super({
            name: CardName_1.CardName.TERRALABS_RESEARCH,
            tags: [Tag_1.Tag.SCIENCE, Tag_1.Tag.EARTH],
            startingMegaCredits: 30,
            cardCost: 1,
            metadata: {
                cardNumber: 'R14',
                description: 'You start with 30 M€. Lower your TR 1 step.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.br;
                    b.megacredits(30).nbsp.minus().tr(1);
                    b.corpBox('effect', (ce) => {
                        ce.effect('Buying cards to hand costs 1 M€.', (eb) => {
                            eb.cards(1).startEffect.megacredits(1);
                        });
                    });
                }),
            },
        });
    }
    bespokePlay(player) {
        player.decreaseTerraformRating();
        return undefined;
    }
}
exports.TerralabsResearch = TerralabsResearch;
