"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopsoilContract = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const CardRenderer_1 = require("../render/CardRenderer");
const CardResource_1 = require("../../../common/CardResource");
const Resource_1 = require("../../../common/Resource");
class TopsoilContract extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.TOPSOIL_CONTRACT,
            tags: [Tag_1.Tag.MICROBE, Tag_1.Tag.EARTH],
            cost: 8,
            behavior: {
                stock: { plants: 3 },
            },
            metadata: {
                cardNumber: 'X30',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.effect('When you gain a microbe to ANY CARD, also gain 1 M€.', (eb) => {
                        eb.microbes(1).asterix().startEffect.megacredits(1);
                    }).br;
                    b.plants(3);
                }),
                description: 'Gain 3 plants.',
            },
        });
    }
    onResourceAdded(player, card, count) {
        if (card.resourceType === CardResource_1.CardResource.MICROBE) {
            player.addResource(Resource_1.Resource.MEGACREDITS, count, { log: true });
        }
    }
}
exports.TopsoilContract = TopsoilContract;
