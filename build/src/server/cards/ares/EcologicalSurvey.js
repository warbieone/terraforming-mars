"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EcologicalSurvey = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const SpaceBonus_1 = require("../../../common/boards/SpaceBonus");
const Resource_1 = require("../../../common/Resource");
const CardResource_1 = require("../../../common/CardResource");
const Tag_1 = require("../../../common/cards/Tag");
const CardRenderer_1 = require("../render/CardRenderer");
const SurveyCard_1 = require("./SurveyCard");
const Options_1 = require("../Options");
class EcologicalSurvey extends SurveyCard_1.SurveyCard {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.ECOLOGICAL_SURVEY,
            tags: [Tag_1.Tag.SCIENCE],
            cost: 9,
            requirements: { greeneries: 3, all: Options_1.all },
            metadata: {
                description: 'Requires 3 greeneries on Mars.',
                cardNumber: 'A07',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.effect('When placing a tile grants you any plants, animals or microbes, you gain one additional of each of those resources that you gain.', (eb) => {
                        eb.emptyTile().startEffect;
                        eb.plus().plants(1).resource(CardResource_1.CardResource.ANIMAL).resource(CardResource_1.CardResource.MICROBE);
                    });
                }),
            },
        });
    }
    checkForBonuses(cardOwner, space) {
        super.maybeRewardStandardResource(cardOwner, space, Resource_1.Resource.PLANTS, SpaceBonus_1.SpaceBonus.PLANT);
        super.maybeRewardCardResource(cardOwner, space, CardResource_1.CardResource.MICROBE, SpaceBonus_1.SpaceBonus.MICROBE);
        super.maybeRewardCardResource(cardOwner, space, CardResource_1.CardResource.ANIMAL, SpaceBonus_1.SpaceBonus.ANIMAL);
    }
}
exports.EcologicalSurvey = EcologicalSurvey;
