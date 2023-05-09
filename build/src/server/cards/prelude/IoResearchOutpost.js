"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IoResearchOutpost = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const PreludeCard_1 = require("./PreludeCard");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class IoResearchOutpost extends PreludeCard_1.PreludeCard {
    constructor() {
        super({
            name: CardName_1.CardName.IO_RESEARCH_OUTPOST,
            tags: [Tag_1.Tag.JOVIAN, Tag_1.Tag.SCIENCE],
            behavior: {
                production: { titanium: 1 },
                drawCard: 1,
            },
            metadata: {
                cardNumber: 'P16',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.titanium(1)).br;
                    b.cards(1);
                }),
                description: 'Increase your titanium production 1 step. Draw a card.',
            },
        });
    }
}
exports.IoResearchOutpost = IoResearchOutpost;
