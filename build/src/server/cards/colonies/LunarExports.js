"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LunarExports = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const Card_1 = require("../Card");
const CardRenderer_1 = require("../render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
class LunarExports extends Card_1.Card {
    constructor() {
        super({
            cost: 19,
            tags: [Tag_1.Tag.EARTH, Tag_1.Tag.SPACE],
            name: CardName_1.CardName.LUNAR_EXPORTS,
            type: CardType_1.CardType.AUTOMATED,
            behavior: {
                or: {
                    behaviors: [{
                            title: 'Increase your M€ production by 5',
                            production: { megacredits: 5 },
                        },
                        {
                            title: 'Increase your plant production by 2',
                            production: { plants: 2 },
                        }],
                },
            },
            metadata: {
                cardNumber: 'C21',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => {
                        pb.plants(2).or(Size_1.Size.SMALL).megacredits(5);
                    });
                }),
                description: 'Increase your plant production 2 steps, or your M€ production 5 steps.',
            },
        });
    }
}
exports.LunarExports = LunarExports;
