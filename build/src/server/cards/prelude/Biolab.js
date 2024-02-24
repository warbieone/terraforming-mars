"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Biolab = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const PreludeCard_1 = require("./PreludeCard");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class Biolab extends PreludeCard_1.PreludeCard {
    constructor() {
        super({
            name: CardName_1.CardName.BIOLAB,
            tags: [Tag_1.Tag.SCIENCE],
            behavior: {
                production: { plants: 1 },
                drawCard: 3,
            },
            metadata: {
                cardNumber: 'P04',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.plants(1)).br;
                    b.cards(3);
                }),
                description: 'Increase your plant production 1 step. Draw 3 cards.',
            },
        });
    }
}
exports.Biolab = Biolab;
