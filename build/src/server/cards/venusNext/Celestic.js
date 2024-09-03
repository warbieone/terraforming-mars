"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Celestic = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardResource_1 = require("../../../common/CardResource");
const CorporationCard_1 = require("../corporation/CorporationCard");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const AltSecondaryTag_1 = require("../../../common/cards/render/AltSecondaryTag");
const floaterCards_1 = require("./floaterCards");
class Celestic extends CorporationCard_1.ActiveCorporationCard {
    constructor() {
        super({
            name: CardName_1.CardName.CELESTIC,
            tags: [Tag_1.Tag.VENUS],
            startingMegaCredits: 42,
            resourceType: CardResource_1.CardResource.FLOATER,
            initialActionText: 'Draw 2 cards with a floater icon on it',
            victoryPoints: { resourcesHere: {}, per: 3 },
            action: {
                addResourcesToAnyCard: {
                    type: CardResource_1.CardResource.FLOATER,
                    count: 1,
                    autoSelect: true,
                },
            },
            metadata: {
                cardNumber: 'R05',
                description: 'You start with 42 M€. As your first action, reveal cards from the deck until you have revealed 2 cards with a floater icon on it. Take them into hand and discard the rest.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.megacredits(42).nbsp.cards(2, { secondaryTag: AltSecondaryTag_1.AltSecondaryTag.FLOATER });
                    b.corpBox('action', (ce) => {
                        ce.action('Add a floater to ANY card. 1 VP per 3 floaters on this card.', (eb) => {
                            eb.empty().startAction.resource(CardResource_1.CardResource.FLOATER).asterix();
                        });
                        ce.vSpace();
                    });
                }),
            },
        });
    }
    initialAction(player) {
        player.drawCard(2, {
            include: (card) => floaterCards_1.floaterCards.has(card.name) || card.resourceType === CardResource_1.CardResource.FLOATER,
        });
        return undefined;
    }
}
exports.Celestic = Celestic;
