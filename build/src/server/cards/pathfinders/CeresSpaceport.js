"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CeresSpaceport = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const SpaceName_1 = require("../../SpaceName");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class CeresSpaceport extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.CERES_SPACEPORT,
            tags: [Tag_1.Tag.JOVIAN, Tag_1.Tag.JOVIAN, Tag_1.Tag.CITY, Tag_1.Tag.SPACE],
            cost: 36,
            victoryPoints: 1,
            behavior: {
                drawCard: 1,
                ocean: {},
                city: { space: SpaceName_1.SpaceName.CERES_SPACEPORT },
                production: { megacredits: 2, titanium: { tag: Tag_1.Tag.JOVIAN, per: 2 } },
            },
            metadata: {
                cardNumber: 'Pf14',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.megacredits(2))
                        .production((pb) => pb.titanium(1).slash().jovian({ amount: 2, played: Options_1.played }))
                        .br
                        .cards(1).oceans(1).city().asterix().br;
                }),
                description: 'Increase your M€ production 2 steps, and titanium production 1 step for every 2 Jovian tags (including these.) ' +
                    'Draw a card. Place an ocean tile. Place a city tile ON THE RESERVED AREA.',
            },
        });
    }
}
exports.CeresSpaceport = CeresSpaceport;
