"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrefabricationofHumanHabitats = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Resource_1 = require("../../../common/Resource");
const CardRequirements_1 = require("../requirements/CardRequirements");
const Tag_1 = require("../../../common/cards/Tag");
const Size_1 = require("../../../common/cards/render/Size");
const Options_1 = require("../Options");
class PrefabricationofHumanHabitats extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.PREFABRICATION_OF_HUMAN_HABITATS,
            cost: 8,
            tags: [Tag_1.Tag.BUILDING, Tag_1.Tag.CITY],
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.production(Resource_1.Resource.STEEL)),
            cardDiscount: { tag: Tag_1.Tag.CITY, amount: 2 },
            metadata: {
                cardNumber: 'Pf02',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.effect('Cards with a city tag cost 2M€ less.', (eb) => {
                        eb.city({ size: Size_1.Size.MEDIUM, played: Options_1.played }).startEffect.megacredits(-2);
                    });
                    b.br;
                    b.effect('The CITY STANDARD PROJECT costs 2M€ less. STEEL MAY BE USED as if you were playing a building card.', (eb) => {
                        eb.city().asterix().startEffect.megacredits(23).openBrackets.steel(1).closeBrackets;
                    });
                }),
                description: 'Requires that you have steel production.',
            },
        });
    }
}
exports.PrefabricationofHumanHabitats = PrefabricationofHumanHabitats;
//# sourceMappingURL=PrefabricationofHumanHabitats.js.map