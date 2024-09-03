"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Arklight = void 0;
const CorporationCard_1 = require("../corporation/CorporationCard");
const Tag_1 = require("../../../common/cards/Tag");
const CardResource_1 = require("../../../common/CardResource");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Resource_1 = require("../../../common/Resource");
class Arklight extends CorporationCard_1.CorporationCard {
    constructor() {
        super({
            name: CardName_1.CardName.ARKLIGHT,
            tags: [Tag_1.Tag.ANIMAL],
            startingMegaCredits: 50,
            resourceType: CardResource_1.CardResource.ANIMAL,
            victoryPoints: { resourcesHere: {}, per: 2 },
            behavior: {
                addResources: 1,
                production: { megacredits: 1 },
            },
            metadata: {
                cardNumber: 'R04',
                description: 'You start with 50 M€. 1 VP per 2 animals on this card.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.megacredits(50);
                    b.corpBox('effect', (ce) => {
                        ce.effect('When you play an animal or plant tag, including this, gain 1 M€ production and add 1 animal to this card.', (eb) => {
                            eb.tag(Tag_1.Tag.ANIMAL).slash().tag(Tag_1.Tag.PLANT).startEffect.production((pb) => pb.megacredits(1)).resource(CardResource_1.CardResource.ANIMAL);
                        });
                        ce.vSpace();
                    });
                }),
            },
        });
    }
    onCardPlayed(player, card) {
        if (player.isCorporation(CardName_1.CardName.ARKLIGHT)) {
            const plantAnimalTagCount = card.tags.filter((cardTag) => cardTag === Tag_1.Tag.ANIMAL || cardTag === Tag_1.Tag.PLANT).length;
            player.addResourceTo(this, plantAnimalTagCount);
            player.production.add(Resource_1.Resource.MEGACREDITS, plantAnimalTagCount);
        }
    }
}
exports.Arklight = Arklight;
