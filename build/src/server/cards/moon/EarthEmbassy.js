"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EarthEmbassy = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
const Options_1 = require("../Options");
class EarthEmbassy extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.EARTH_EMBASSY,
            type: CardType_1.CardType.ACTIVE,
            tags: [Tag_1.Tag.MOON, Tag_1.Tag.EARTH],
            cost: 16,
            metadata: {
                cardNumber: 'M77',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.effect('After being played, when you perform an action, your Moon tags count as Earth tags, but not vice versa.', (eb) => {
                        eb.empty().startEffect.moon().equals().earth(1, { played: Options_1.played });
                    });
                }),
            },
        });
    }
}
exports.EarthEmbassy = EarthEmbassy;
