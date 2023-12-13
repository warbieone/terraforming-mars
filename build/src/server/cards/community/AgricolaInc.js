"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgricolaInc = void 0;
const CorporationCard_1 = require("../corporation/CorporationCard");
const Tag_1 = require("../../../common/cards/Tag");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
const CardRenderDynamicVictoryPoints_1 = require("../render/CardRenderDynamicVictoryPoints");
const utils_1 = require("../../../common/utils/utils");
class AgricolaInc extends CorporationCard_1.CorporationCard {
    constructor() {
        super({
            name: CardName_1.CardName.AGRICOLA_INC,
            tags: [Tag_1.Tag.PLANT],
            startingMegaCredits: 40,
            victoryPoints: 'special',
            behavior: {
                production: { megacredits: 1, plants: 1, heat: 1 },
            },
            metadata: {
                cardNumber: 'R36',
                description: 'You start with 1 plant production, 1 M€ production, 1 heat production and 40 M€.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.br.br;
                    b.production((pb) => pb.megacredits(1).plants(1).heat(1)).nbsp.megacredits(40);
                    b.corpBox('effect', (ce) => {
                        ce.text('Effect: At game end, score -2 / 0 / 1 / 2 VP PER TAG TYPE for 0 / 1-2 / 3-4 / 5+ tags.', Size_1.Size.SMALL, true);
                    });
                }),
                victoryPoints: CardRenderDynamicVictoryPoints_1.CardRenderDynamicVictoryPoints.questionmark(),
            },
        });
    }
    getVictoryPoints(player) {
        const scorableTags = [...player.game.tags];
        (0, utils_1.inplaceRemove)(scorableTags, Tag_1.Tag.WILD);
        (0, utils_1.inplaceRemove)(scorableTags, Tag_1.Tag.EVENT);
        (0, utils_1.inplaceRemove)(scorableTags, Tag_1.Tag.CLONE);
        const playerTags = player.tags.countAllTags();
        let points = 0;
        scorableTags.forEach((tag) => {
            const tagData = playerTags.find((data) => data.tag === tag);
            if (tagData === undefined) {
                points -= 2;
            }
            else if (tagData.count === 3 || tagData.count === 4) {
                points += 1;
            }
            else if (tagData.count > 4) {
                points += 2;
            }
        });
        return points;
    }
}
exports.AgricolaInc = AgricolaInc;
//# sourceMappingURL=AgricolaInc.js.map