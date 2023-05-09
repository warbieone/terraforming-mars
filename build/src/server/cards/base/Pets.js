"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pets = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardResource_1 = require("../../../common/CardResource");
const CardName_1 = require("../../../common/cards/CardName");
const DeferredAction_1 = require("../../deferredActions/DeferredAction");
const AddResourcesToCard_1 = require("../../deferredActions/AddResourcesToCard");
const Board_1 = require("../../boards/Board");
const CardRenderer_1 = require("../render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
const Options_1 = require("../Options");
class Pets extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.PETS,
            tags: [Tag_1.Tag.EARTH, Tag_1.Tag.ANIMAL],
            cost: 10,
            resourceType: CardResource_1.CardResource.ANIMAL,
            victoryPoints: { resourcesHere: {}, per: 2 },
            behavior: {
                addResources: 1,
            },
            metadata: {
                cardNumber: '172',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.effect('When any city tile is placed, add an animal to this card.', (eb) => {
                        eb.city({ size: Size_1.Size.SMALL, all: Options_1.all }).startEffect.animals(1);
                    }).br;
                    b.animals(1).br;
                    b.text('Animals may not be removed from this card', Size_1.Size.SMALL, true).br;
                    b.vpText('1 VP per 2 animals here.');
                }),
                description: { text: 'Add 1 animal to this card.', align: 'left' },
            },
        });
    }
    onTilePlaced(cardOwner, activePlayer, space) {
        if (Board_1.Board.isCitySpace(space)) {
            cardOwner.game.defer(new AddResourcesToCard_1.AddResourcesToCard(cardOwner, CardResource_1.CardResource.ANIMAL, { filter: (c) => c.name === this.name }), cardOwner.id !== activePlayer.id ? DeferredAction_1.Priority.OPPONENT_TRIGGER : undefined);
        }
    }
}
exports.Pets = Pets;
