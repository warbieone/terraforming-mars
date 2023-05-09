"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LunarEmbassy = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const SpaceName_1 = require("../../SpaceName");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class LunarEmbassy extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.LUNAR_EMBASSY,
            tags: [Tag_1.Tag.EARTH, Tag_1.Tag.MARS, Tag_1.Tag.CITY, Tag_1.Tag.SPACE],
            cost: 28,
            victoryPoints: 2,
            behavior: {
                drawCard: 1,
                city: { space: SpaceName_1.SpaceName.LUNAR_EMBASSY },
                production: { megacredits: 3, plants: { tag: Tag_1.Tag.EARTH, per: 2 } },
            },
            metadata: {
                cardNumber: 'Pf16',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.megacredits(3))
                        .production((pb) => pb.plants(1).slash().earth(2, { played: Options_1.played }))
                        .br
                        .cards(1).city().asterix().br;
                }),
                description: 'Increase your M€ production 3 steps, and plant production 1 step for every 2 Earth tags (including this.) ' +
                    'Draw a card. Place a city tile ON THE RESERVED AREA.',
            },
        });
    }
}
exports.LunarEmbassy = LunarEmbassy;
