"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResearchGrant = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const PreludeCard_1 = require("../prelude/PreludeCard");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class ResearchGrant extends PreludeCard_1.PreludeCard {
    constructor() {
        super({
            name: CardName_1.CardName.RESEARCH_GRANT,
            tags: [Tag_1.Tag.SCIENCE, Tag_1.Tag.SCIENCE],
            behavior: {
                stock: { megacredits: 8 },
            },
            metadata: {
                cardNumber: 'Y04',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.megacredits(8);
                }),
                description: 'Gain 8 M€.',
            },
        });
    }
}
exports.ResearchGrant = ResearchGrant;
