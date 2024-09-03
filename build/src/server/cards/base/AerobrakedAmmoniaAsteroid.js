"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AerobrakedAmmoniaAsteroid = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardResource_1 = require("../../../common/CardResource");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class AerobrakedAmmoniaAsteroid extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.EVENT,
            name: CardName_1.CardName.AEROBRAKED_AMMONIA_ASTEROID,
            tags: [Tag_1.Tag.SPACE],
            cost: 26,
            behavior: {
                production: { heat: 4, plants: 1 },
                addResourcesToAnyCard: { count: 3, type: CardResource_1.CardResource.MICROBE },
            },
            metadata: {
                description: 'Increase your heat production 4 steps and your plant production 1 step. Add 3 Microbes to ANOTHER card.',
                cardNumber: '170',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => {
                        pb.heat(4).br;
                        pb.plants(1);
                    }).br;
                    b.resource(CardResource_1.CardResource.MICROBE, 3).asterix();
                }),
            },
        });
    }
}
exports.AerobrakedAmmoniaAsteroid = AerobrakedAmmoniaAsteroid;
