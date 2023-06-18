"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Arklight = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardResource_1 = require("../../../common/CardResource");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const Card_1 = require("../Card");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
const Resource_1 = require("../../../common/Resource");
class Arklight extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.ARKLIGHT,
            tags: [Tag_1.Tag.ANIMAL],
            startingMegaCredits: 50,
            resourceType: CardResource_1.CardResource.ANIMAL,
            type: CardType_1.CardType.CORPORATION,
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
                            eb.animals(1, { played: Options_1.played }).slash().plants(1, { played: Options_1.played }).startEffect.production((pb) => pb.megacredits(1)).animals(1);
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
//# sourceMappingURL=Arklight.js.map