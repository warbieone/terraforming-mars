"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Anthozoa = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Resource_1 = require("../../../common/Resource");
const Tag_1 = require("../../../common/cards/Tag");
const CardResource_1 = require("../../../common/CardResource");
class Anthozoa extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.ANTHOZOA,
            cost: 9,
            tags: [Tag_1.Tag.PLANT, Tag_1.Tag.ANIMAL, Tag_1.Tag.MARS],
            requirements: { oceans: 3 },
            resourceType: CardResource_1.CardResource.ANIMAL,
            victoryPoints: { resourcesHere: {}, per: 2 },
            metadata: {
                cardNumber: 'Pf55',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Spend 1 plant to add an animal to this card.', (eb) => {
                        eb.plants(1).startAction.animals(1);
                    });
                }),
                description: 'Requires 3 oceans on Mars. 1 VP per 2 animals on this card.',
            },
        });
    }
    canAct(player) {
        return player.plants > 0;
    }
    action(player) {
        player.stock.deduct(Resource_1.Resource.PLANTS, 1);
        player.addResourceTo(this);
        player.game.log('${0} spent 1 plant to place an animal on ${1}.', (b) => b.player(player).card(this));
        return undefined;
    }
}
exports.Anthozoa = Anthozoa;
