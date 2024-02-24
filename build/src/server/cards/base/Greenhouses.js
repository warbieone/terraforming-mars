"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Greenhouses = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
const Options_1 = require("../Options");
class Greenhouses extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.GREENHOUSES,
            tags: [Tag_1.Tag.PLANT, Tag_1.Tag.BUILDING],
            cost: 6,
            behavior: {
                stock: { plants: { cities: {} } },
            },
            metadata: {
                cardNumber: '096',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.plants(1).slash().city({ size: Size_1.Size.SMALL, all: Options_1.all });
                }),
                description: 'Gain 1 plant for each city tile in play.',
            },
        });
    }
}
exports.Greenhouses = Greenhouses;
