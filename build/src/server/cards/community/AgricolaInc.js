"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgricolaInc = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const CardRenderer_1 = require("../render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
const CardRenderDynamicVictoryPoints_1 = require("../render/CardRenderDynamicVictoryPoints");
class AgricolaInc extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.AGRICOLA_INC,
            tags: [Tag_1.Tag.PLANT],
            startingMegaCredits: 40,
            type: CardType_1.CardType.CORPORATION,
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
        const scorableTags = [Tag_1.Tag.CITY, Tag_1.Tag.EARTH, Tag_1.Tag.POWER, Tag_1.Tag.JOVIAN, Tag_1.Tag.MICROBE, Tag_1.Tag.PLANT, Tag_1.Tag.SCIENCE, Tag_1.Tag.SPACE, Tag_1.Tag.BUILDING, Tag_1.Tag.ANIMAL];
        if (player.game.gameOptions.venusNextExtension)
            scorableTags.push(Tag_1.Tag.VENUS);
        const playerTags = player.tags.getAllTags();
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
