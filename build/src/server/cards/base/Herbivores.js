"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Herbivores = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const Resource_1 = require("../../../common/Resource");
const CardResource_1 = require("../../../common/CardResource");
const CardName_1 = require("../../../common/cards/CardName");
const AddResourcesToCard_1 = require("../../deferredActions/AddResourcesToCard");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
const Board_1 = require("../../boards/Board");
class Herbivores extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.HERBIVORES,
            tags: [Tag_1.Tag.ANIMAL],
            cost: 12,
            resourceType: CardResource_1.CardResource.ANIMAL,
            victoryPoints: { resourcesHere: {}, per: 2 },
            requirements: { oxygen: 8 },
            behavior: {
                decreaseAnyProduction: { type: Resource_1.Resource.PLANTS, count: 1 },
                addResources: 1,
            },
            metadata: {
                cardNumber: '147',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.effect('When you place a greenery tile, add an animal to this card.', (eb) => {
                        eb.greenery({ withO2: false }).startEffect.resource(CardResource_1.CardResource.ANIMAL);
                    }).br;
                    b.vpText('1 VP per 2 animals on this card.');
                    b.resource(CardResource_1.CardResource.ANIMAL).production((pb) => pb.minus().plants(1, { all: Options_1.all }));
                }),
                description: {
                    text: 'Requires 8% oxygen. +1 animal to this card. -1 any plant production',
                    align: 'left',
                },
            },
        });
    }
    onTilePlaced(cardOwner, activePlayer, space) {
        if (cardOwner.id === activePlayer.id && Board_1.Board.isGreenerySpace(space)) {
            cardOwner.game.defer(new AddResourcesToCard_1.AddResourcesToCard(cardOwner, CardResource_1.CardResource.ANIMAL, { filter: (c) => c.name === this.name }));
        }
    }
}
exports.Herbivores = Herbivores;
