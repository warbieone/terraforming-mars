"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrefabricationofHumanHabitats = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Resource_1 = require("../../../common/Resource");
const Tag_1 = require("../../../common/cards/Tag");
const Size_1 = require("../../../common/cards/render/Size");
class PrefabricationofHumanHabitats extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.PREFABRICATION_OF_HUMAN_HABITATS,
            cost: 8,
            tags: [Tag_1.Tag.BUILDING, Tag_1.Tag.CITY],
            requirements: { production: Resource_1.Resource.STEEL, count: 1 },
            cardDiscount: { tag: Tag_1.Tag.CITY, amount: 2 },
            metadata: {
                cardNumber: 'Pf02',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.effect('Cards with a city tag cost 2M€ less.', (eb) => {
                        eb.tag(Tag_1.Tag.CITY, { size: Size_1.Size.MEDIUM }).startEffect.megacredits(-2);
                    });
                    b.br;
                    b.effect('The CITY STANDARD PROJECT costs 2M€ less. STEEL MAY BE USED as if you were playing a building card.', (eb) => {
                        eb.city().asterix().startEffect.megacredits(23).super((b) => b.steel(1));
                    });
                }),
                description: 'Requires that you have steel production.',
            },
        });
    }
}
exports.PrefabricationofHumanHabitats = PrefabricationofHumanHabitats;
