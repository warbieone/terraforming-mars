"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoverConstruction = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const Resource_1 = require("../../../common/Resource");
const DeferredAction_1 = require("../../deferredActions/DeferredAction");
const GainResources_1 = require("../../deferredActions/GainResources");
const Board_1 = require("../../boards/Board");
const CardRenderer_1 = require("../render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
const Options_1 = require("../Options");
class RoverConstruction extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.ROVER_CONSTRUCTION,
            tags: [Tag_1.Tag.BUILDING],
            cost: 8,
            victoryPoints: 1,
            metadata: {
                cardNumber: '038',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.effect('When any city tile is placed, gain 2 M€.', (eb) => {
                        eb.city({ size: Size_1.Size.SMALL, all: Options_1.all }).startEffect.megacredits(2);
                    });
                }),
            },
        });
    }
    onTilePlaced(cardOwner, activePlayer, space) {
        if (Board_1.Board.isCitySpace(space)) {
            cardOwner.game.defer(new GainResources_1.GainResources(cardOwner, Resource_1.Resource.MEGACREDITS, { count: 2, log: true }), cardOwner.id !== activePlayer.id ? DeferredAction_1.Priority.OPPONENT_TRIGGER : undefined);
        }
    }
}
exports.RoverConstruction = RoverConstruction;
