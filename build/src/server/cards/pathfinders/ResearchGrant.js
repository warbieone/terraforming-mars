"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResearchGrant = void 0;
const PreludeCard_1 = require("../prelude/PreludeCard");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Tag_1 = require("../../../common/cards/Tag");
class ResearchGrant extends PreludeCard_1.PreludeCard {
    constructor() {
        super({
            name: CardName_1.CardName.RESEARCH_GRANT_PATHFINDERS,
            tags: [Tag_1.Tag.SCIENCE, Tag_1.Tag.SCIENCE],
            behavior: {
                production: { energy: 1 },
                stock: { megacredits: 14 },
            },
            metadata: {
                cardNumber: 'P08',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.energy(1)).br;
                    b.megacredits(14);
                }),
                description: 'Increase your energy production 1 step. Gain 14 M€.',
            },
        });
    }
}
exports.ResearchGrant = ResearchGrant;
