"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StandardTechnology = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Resource_1 = require("../../../common/Resource");
class StandardTechnology extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.STANDARD_TECHNOLOGY,
            tags: [Tag_1.Tag.SCIENCE],
            cost: 6,
            metadata: {
                cardNumber: '156',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.effect('After you pay for a standard project, except selling patents, you gain 3 M€.', (eb) => {
                        eb.plate('Standard projects').startEffect.megacredits(3);
                    });
                }),
            },
        });
    }
    onStandardProject(player, projectType) {
        if (projectType.name !== CardName_1.CardName.SELL_PATENTS_STANDARD_PROJECT) {
            player.addResource(Resource_1.Resource.MEGACREDITS, 3, { log: true });
        }
    }
}
exports.StandardTechnology = StandardTechnology;
