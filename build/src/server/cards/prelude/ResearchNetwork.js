"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResearchNetwork = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const PreludeCard_1 = require("./PreludeCard");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class ResearchNetwork extends PreludeCard_1.PreludeCard {
    constructor() {
        super({
            name: CardName_1.CardName.RESEARCH_NETWORK,
            tags: [Tag_1.Tag.WILD],
            behavior: {
                production: { megacredits: 1 },
                drawCard: 3,
            },
            metadata: {
                cardNumber: 'P28',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.megacredits(1)).br;
                    b.cards(3);
                }),
                description: 'Increase your M€ production 1 step. Draw 3 cards. After being played, when you perform an action, the wild tag counts as any tag of your choice.',
            },
        });
    }
}
exports.ResearchNetwork = ResearchNetwork;
