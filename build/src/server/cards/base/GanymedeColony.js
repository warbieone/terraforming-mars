"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GanymedeColony = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const SpaceName_1 = require("../../SpaceName");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class GanymedeColony extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.GANYMEDE_COLONY,
            tags: [Tag_1.Tag.JOVIAN, Tag_1.Tag.SPACE, Tag_1.Tag.CITY],
            cost: 20,
            victoryPoints: { tag: Tag_1.Tag.JOVIAN },
            behavior: {
                city: { space: SpaceName_1.SpaceName.GANYMEDE_COLONY },
            },
            metadata: {
                description: 'Place a city tile ON THE RESERVED AREA.',
                cardNumber: '081',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.city().asterix().br;
                    b.vpText('1 VP per Jovian tag you have.');
                }),
            },
        });
    }
}
exports.GanymedeColony = GanymedeColony;
