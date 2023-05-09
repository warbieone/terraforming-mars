"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AICentral = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRequirements_1 = require("../CardRequirements");
const CardRenderer_1 = require("../render/CardRenderer");
const ActionCard_1 = require("../ActionCard");
class AICentral extends ActionCard_1.ActionCard {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.AI_CENTRAL,
            tags: [Tag_1.Tag.SCIENCE, Tag_1.Tag.BUILDING],
            cost: 21,
            behavior: {
                production: { energy: -1 },
            },
            action: {
                drawCard: { count: 2 },
            },
            victoryPoints: 1,
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.tag(Tag_1.Tag.SCIENCE, 3)),
            metadata: {
                description: {
                    text: 'Requires 3 science tags to play. Decrease your energy production 1 step.',
                    align: 'left',
                },
                cardNumber: '208',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Draw 2 cards.', (ab) => ab.empty().startAction.cards(2)).br;
                    b.production((pb) => pb.minus().energy(1));
                }),
            },
        });
    }
}
exports.AICentral = AICentral;
