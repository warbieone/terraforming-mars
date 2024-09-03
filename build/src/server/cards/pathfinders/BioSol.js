"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BioSol = void 0;
const CorporationCard_1 = require("../corporation/CorporationCard");
const Tag_1 = require("../../../common/cards/Tag");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const CardResource_1 = require("../../../common/CardResource");
class BioSol extends CorporationCard_1.ActiveCorporationCard {
    constructor() {
        super({
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
                    b.corpBox('action', (corpbox) => corpbox.action('Add 1 microbe to ANY card', (ab) => ab.empty().startAction.resource(CardResource_1.CardResource.MICROBE).asterix()));
                }),
            },
        });
    }
}
exports.BioSol = BioSol;
