"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArtificialPhotosynthesis = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
class ArtificialPhotosynthesis extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.ARTIFICIAL_PHOTOSYNTHESIS,
            tags: [Tag_1.Tag.SCIENCE],
            cost: 12,
            behavior: {
                or: {
                    autoSelect: true,
                    behaviors: [
                        {
                            production: { energy: 2 },
                            title: 'Increase your energy production 2 steps',
                        },
                        {
                            production: { plants: 1 },
                            title: 'Increase your plant production 1 step',
                        },
                    ],
                },
            },
            metadata: {
                description: 'Increase your plant production 1 step or your energy production 2 steps.',
                cardNumber: '115',
                renderData: CardRenderer_1.CardRenderer.builder((b) => b.production((pb) => pb.plants(1).or(Size_1.Size.SMALL).energy(2))),
            },
        });
    }
}
exports.ArtificialPhotosynthesis = ArtificialPhotosynthesis;
