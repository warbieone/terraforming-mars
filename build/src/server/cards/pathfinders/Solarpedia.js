"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Solarpedia = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardRenderer_1 = require("../render/CardRenderer");
const CardResource_1 = require("../../../common/CardResource");
const ActionCard_1 = require("../ActionCard");
const CardRequirements_1 = require("../requirements/CardRequirements");
class Solarpedia extends ActionCard_1.ActionCard {
    constructor() {
        super({
            name: CardName_1.CardName.SOLARPEDIA,
            type: CardType_1.CardType.ACTIVE,
            tags: [Tag_1.Tag.SPACE],
            cost: 12,
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.tag(Tag_1.Tag.VENUS).tag(Tag_1.Tag.EARTH).tag(Tag_1.Tag.MARS).tag(Tag_1.Tag.JOVIAN)),
            resourceType: CardResource_1.CardResource.DATA,
            victoryPoints: { resourcesHere: {}, per: 6 },
            behavior: {
                addResourcesToAnyCard: { type: CardResource_1.CardResource.DATA, count: 2 },
            },
            action: {
                addResourcesToAnyCard: { type: CardResource_1.CardResource.DATA, count: 2 },
            },
            metadata: {
                cardNumber: 'Pf54',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Add 2 data to ANY card.', (ab) => {
                        ab.empty().startAction.data({ amount: 2 }).asterix();
                    }).br;
                    b.data({ amount: 2 }).asterix();
                }),
                description: 'Requires 1 Venus, Earth, Mars, and Jovian Tag. Add 2 data to ANY card. 1 VP for every 6 data resources here.',
            },
        });
    }
}
exports.Solarpedia = Solarpedia;
//# sourceMappingURL=Solarpedia.js.map