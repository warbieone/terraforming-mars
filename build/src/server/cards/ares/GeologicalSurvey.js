"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeologicalSurvey = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const SpaceBonus_1 = require("../../../common/boards/SpaceBonus");
const Resource_1 = require("../../../common/Resource");
const Tag_1 = require("../../../common/cards/Tag");
const CardRequirements_1 = require("../CardRequirements");
const CardRenderer_1 = require("../render/CardRenderer");
const SurveyCard_1 = require("./SurveyCard");
const Options_1 = require("../Options");
class GeologicalSurvey extends SurveyCard_1.SurveyCard {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.GEOLOGICAL_SURVEY,
            tags: [Tag_1.Tag.SCIENCE],
            cost: 8,
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.greeneries(5, { all: Options_1.all, max: Options_1.max })),
            metadata: {
                cardNumber: 'A09',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.effect('When placing a tile ON MARS grants you any steel, titanium, or heat, you gain one additional of each of those resources that you gain.', (eb) => {
                        eb.emptyTile().startEffect;
                        eb.plus().steel(1).titanium(1).heat(1);
                    });
                }),
                description: 'Requires 5 or fewer greeneries on Mars.',
            },
        });
    }
    checkForBonuses(cardOwner, space) {
        super.testForStandardResource(cardOwner, space, Resource_1.Resource.STEEL, SpaceBonus_1.SpaceBonus.STEEL);
        super.testForStandardResource(cardOwner, space, Resource_1.Resource.TITANIUM, SpaceBonus_1.SpaceBonus.TITANIUM);
        super.testForStandardResource(cardOwner, space, Resource_1.Resource.HEAT, SpaceBonus_1.SpaceBonus.HEAT);
    }
}
exports.GeologicalSurvey = GeologicalSurvey;
//# sourceMappingURL=GeologicalSurvey.js.map