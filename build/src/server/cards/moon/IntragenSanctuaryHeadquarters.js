"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntragenSanctuaryHeadquarters = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const Tag_1 = require("../../../common/cards/Tag");
const CorporationCard_1 = require("../corporation/CorporationCard");
const CardRenderer_1 = require("../render/CardRenderer");
const CardResource_1 = require("../../../common/CardResource");
const Options_1 = require("../Options");
const AltSecondaryTag_1 = require("../../../common/cards/render/AltSecondaryTag");
class IntragenSanctuaryHeadquarters extends CorporationCard_1.CorporationCard {
    constructor() {
        super({
            name: CardName_1.CardName.INTRAGEN_SANCTUARY_HEADQUARTERS,
            tags: [Tag_1.Tag.ANIMAL, Tag_1.Tag.MOON],
            startingMegaCredits: 38,
            resourceType: CardResource_1.CardResource.ANIMAL,
            victoryPoints: { resourcesHere: {}, per: 2 },
            behavior: {
                addResources: 1,
            },
            firstAction: {
                text: 'Place a habitat tile on The Moon.',
                moon: { habitatTile: {} },
            },
            metadata: {
                description: 'You start with 38 M€. ' +
                    'As your first action, place a habitat tile on The Moon and raise the habitat rate 1 step. 1 VP for every 2 animals on this card.',
                cardNumber: 'MC8',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.megacredits(38).moonHabitat({ secondaryTag: AltSecondaryTag_1.AltSecondaryTag.MOON_HABITAT_RATE }).br;
                    b.effect('When any player plays an animal tag (including this), add 1 animal on this card.', (eb) => {
                        eb.tag(Tag_1.Tag.ANIMAL, { all: Options_1.all }).startEffect.resource(CardResource_1.CardResource.ANIMAL);
                    }).br;
                }),
            },
        });
    }
    onCorpCardPlayed(player, card) {
        this.onCardPlayed(player, card);
    }
    onCardPlayed(player, card) {
        const count = player.tags.cardTagCount(card, Tag_1.Tag.ANIMAL);
        player.addResourceTo(this, { qty: count, log: true });
    }
}
exports.IntragenSanctuaryHeadquarters = IntragenSanctuaryHeadquarters;
