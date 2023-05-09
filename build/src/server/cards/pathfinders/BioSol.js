"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BioSol = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const CardRenderer_1 = require("../render/CardRenderer");
const CardResource_1 = require("../../../common/CardResource");
const ActionCard_1 = require("../ActionCard");
class BioSol extends ActionCard_1.ActionCard {
    constructor() {
        super({
            type: CardType_1.CardType.CORPORATION,
            name: CardName_1.CardName.BIO_SOL,
            tags: [Tag_1.Tag.MICROBE],
            startingMegaCredits: 42,
            resourceType: CardResource_1.CardResource.MICROBE,
            victoryPoints: { resourcesHere: {}, per: 3 },
            firstAction: {
                text: 'Draw 2 cards with a microbe tag',
                drawCard: { count: 2, tag: Tag_1.Tag.MICROBE },
            },
            action: {
                addResourcesToAnyCard: { type: CardResource_1.CardResource.MICROBE, count: 1 },
            },
            metadata: {
                cardNumber: 'PfC14',
                description: 'You start with 42 M€. As your first action, draw 2 cards with a microbe tag.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.megacredits(42).cards(2, { secondaryTag: Tag_1.Tag.MICROBE }).br;
                    b.corpBox('action', (corpbox) => corpbox.action('Add 1 microbe to ANY card', (ab) => ab.empty().startAction.microbes(1).asterix()));
                }),
            },
        });
    }
}
exports.BioSol = BioSol;
