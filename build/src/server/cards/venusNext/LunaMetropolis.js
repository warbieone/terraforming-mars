"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LunaMetropolis = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const SpaceName_1 = require("../../SpaceName");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
const Options_1 = require("../Options");
class LunaMetropolis extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.LUNA_METROPOLIS,
            type: CardType_1.CardType.AUTOMATED,
            tags: [Tag_1.Tag.CITY, Tag_1.Tag.SPACE, Tag_1.Tag.EARTH],
            cost: 21,
            victoryPoints: 2,
            behavior: {
                production: { megacredits: { tag: Tag_1.Tag.EARTH } },
                city: { space: SpaceName_1.SpaceName.LUNA_METROPOLIS },
            },
            metadata: {
                cardNumber: '236',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.megacredits(1).slash().earth(1, { played: Options_1.played })).br;
                    b.city().asterix();
                }),
                description: 'Increase your M€ production 1 step for each Earth tag you have, including this. Place a city tile on the RESERVED AREA.',
            },
        });
    }
}
exports.LunaMetropolis = LunaMetropolis;
