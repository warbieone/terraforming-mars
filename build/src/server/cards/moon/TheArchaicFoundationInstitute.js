"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TheArchaicFoundationInstitute = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardResource_1 = require("../../../common/CardResource");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
class TheArchaicFoundationInstitute extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.CORPORATION,
            name: CardName_1.CardName.THE_ARCHAIC_FOUNDATION_INSTITUTE,
            tags: [Tag_1.Tag.MOON, Tag_1.Tag.MOON],
            startingMegaCredits: 55,
            resourceType: CardResource_1.CardResource.RESOURCE_CUBE,
            behavior: {
                addResources: 2,
            },
            metadata: {
                description: 'You start with 55 M€.',
                cardNumber: '',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.megacredits(55).br;
                    b.effect('When you play a Moon tag, including these, add a resource cube on this card.', (eb) => {
                        eb.moon().startEffect.resourceCube();
                    }).br;
                    b.effect('Automatically remove every 3 resource cubes collected here and increase your TR 1 step.', (eb) => {
                        eb.resourceCube(3).startEffect.tr(1);
                    });
                }),
            },
        });
    }
    onCardPlayed(player, card) {
        if (player.isCorporation(this.name)) {
            const moonTags = card.tags.filter((t) => t === Tag_1.Tag.MOON);
            const count = moonTags.length;
            if (count > 0) {
                player.addResourceTo(this, count);
            }
        }
    }
    onResourceAdded(player, playedCard) {
        if (playedCard.name !== this.name)
            return;
        if (this.resourceCount >= 3 && player.canAfford(0, { tr: { tr: 1 } })) {
            player.removeResourceFrom(this, 3);
            player.increaseTerraformRating();
        }
    }
}
exports.TheArchaicFoundationInstitute = TheArchaicFoundationInstitute;
