"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheungShingMARS = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CorporationCard_1 = require("../corporation/CorporationCard");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class CheungShingMARS extends CorporationCard_1.CorporationCard {
    constructor() {
        super({
            name: CardName_1.CardName.CHEUNG_SHING_MARS,
            tags: [Tag_1.Tag.BUILDING],
            startingMegaCredits: 47,
            behavior: {
                production: { megacredits: 3 },
            },
            metadata: {
                cardNumber: 'R16',
                description: 'You start with 3 M€ production and 44 M€.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.br.br;
                    b.production((pb) => pb.megacredits(3)).nbsp.megacredits(44);
                    b.corpBox('effect', (ce) => {
                        ce.effect('When you play a building tag, gain 3 M€.', (eb) => {
                            eb.building(1, { played: Options_1.played }).startEffect.megacredits(3);
                        });
                    });
                }),
            },
        });
    }
    onCardPlayed(player, card) {
        if (player.isCorporation(this.name)) {
            const tagCount = player.tags.cardTagCount(card, Tag_1.Tag.BUILDING);
            if (tagCount > 0) {
                player.megaCredits += 3, { log: true };
            }
        }
    }
}
exports.CheungShingMARS = CheungShingMARS;
//# sourceMappingURL=CheungShingMARS.js.map