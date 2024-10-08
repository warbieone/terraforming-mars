"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BactoviralResearch = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const CardResource_1 = require("../../../common/CardResource");
class BactoviralResearch extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.BACTOVIRAL_RESEARCH,
            tags: [Tag_1.Tag.MICROBE, Tag_1.Tag.SCIENCE],
            cost: 10,
            behavior: {
                drawCard: 1,
                addResourcesToAnyCard: { count: { tag: Tag_1.Tag.MICROBE }, type: CardResource_1.CardResource.MICROBE },
            },
            metadata: {
                cardNumber: 'X35',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.cards(1).br.br;
                    b.resource(CardResource_1.CardResource.MICROBE).asterix().slash().tag(Tag_1.Tag.MICROBE);
                }),
                description: 'Draw 1 card. Choose 1 of your played cards and add 1 microbe to it for each mirobe tag you have, including this.',
            },
        });
    }
}
exports.BactoviralResearch = BactoviralResearch;
