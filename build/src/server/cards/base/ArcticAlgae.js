"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArcticAlgae = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const Resource_1 = require("../../../common/Resource");
const DeferredAction_1 = require("../../deferredActions/DeferredAction");
const GainResources_1 = require("../../deferredActions/GainResources");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
const Board_1 = require("../../boards/Board");
class ArcticAlgae extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.ARCTIC_ALGAE,
            tags: [Tag_1.Tag.PLANT],
            cost: 12,
            behavior: {
                stock: { plants: 1 },
            },
            requirements: { temperature: -12, max: Options_1.max },
            metadata: {
                description: 'It must be -12 C or colder to play. Gain 1 plant.',
                cardNumber: '023',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.effect('When anyone places an ocean tile, gain 2 plants.', (be) => be.oceans(1, { all: Options_1.all }).startEffect.plants(2)).br;
                    b.plants(1);
                }),
            },
        });
    }
    onTilePlaced(cardOwner, activePlayer, space) {
        if (Board_1.Board.isUncoveredOceanSpace(space)) {
            cardOwner.game.defer(new GainResources_1.GainResources(cardOwner, Resource_1.Resource.PLANTS, { count: 2 }).andThen(() => activePlayer.game.log('${0} gained 2 ${1} from ${2}', (b) => b.player(cardOwner).string(Resource_1.Resource.PLANTS).cardName(this.name))), cardOwner.id !== activePlayer.id ? DeferredAction_1.Priority.OPPONENT_TRIGGER : undefined);
        }
    }
}
exports.ArcticAlgae = ArcticAlgae;
