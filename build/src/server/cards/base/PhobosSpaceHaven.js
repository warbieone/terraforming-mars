"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhobosSpaceHaven = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const SpaceName_1 = require("../../SpaceName");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class PhobosSpaceHaven extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.PHOBOS_SPACE_HAVEN,
            tags: [Tag_1.Tag.SPACE, Tag_1.Tag.CITY],
            cost: 25,
            victoryPoints: 3,
            behavior: {
                production: { titanium: 1 },
                city: { space: SpaceName_1.SpaceName.PHOBOS_SPACE_HAVEN },
            },
            metadata: {
                cardNumber: '021',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.titanium(1)).nbsp.city().asterix();
                }),
                description: 'Increase your titanium production 1 step and place a city tile ON THE RESERVED AREA.',
            },
        });
    }
}
exports.PhobosSpaceHaven = PhobosSpaceHaven;
