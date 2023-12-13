"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Recyclon = void 0;
const CorporationCard_1 = require("../corporation/CorporationCard");
const Tag_1 = require("../../../common/cards/Tag");
const Resource_1 = require("../../../common/Resource");
const CardResource_1 = require("../../../common/CardResource");
const SelectOption_1 = require("../../inputs/SelectOption");
const OrOptions_1 = require("../../inputs/OrOptions");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class Recyclon extends CorporationCard_1.CorporationCard {
    constructor() {
        super({
            name: CardName_1.CardName.RECYCLON,
            tags: [Tag_1.Tag.MICROBE, Tag_1.Tag.BUILDING],
            startingMegaCredits: 40,
            resourceType: CardResource_1.CardResource.MICROBE,
            behavior: {
                production: { steel: 2 },
                addResources: 1,
            },
            metadata: {
                cardNumber: 'R26',
                description: 'You start with 40 M€ and 2 steel production.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.br.br;
                    b.megacredits(40).nbsp.production((pb) => pb.steel(2));
                    b.corpBox('effect', (ce) => {
                        ce.effect('When you play a building tag, including this, gain 1 microbe to this card, or remove 2 microbes here and raise your plant production 1 step.', (eb) => {
                            eb.building(1, { played: Options_1.played }).colon().microbes(1).or();
                            eb.microbes(2, { digit: Options_1.digit }).startEffect.production((pb) => pb.plants(1));
                        });
                    });
                }),
            },
        });
    }
    onCardPlayed(player, card) {
        if (card.tags.includes(Tag_1.Tag.BUILDING) === false || !player.isCorporation(this.name)) {
            return undefined;
        }
        if (this.resourceCount < 2) {
            player.addResourceTo(this);
            return undefined;
        }
        const addResource = new SelectOption_1.SelectOption('Add a microbe resource to this card', 'Add microbe').andThen(() => {
            player.addResourceTo(this);
            return undefined;
        });
        const spendResource = new SelectOption_1.SelectOption('Remove 2 microbes on this card and increase plant production 1 step', 'Remove microbes').andThen(() => {
            player.removeResourceFrom(this, 2);
            player.production.add(Resource_1.Resource.PLANTS, 1);
            return undefined;
        });
        return new OrOptions_1.OrOptions(spendResource, addResource);
    }
}
exports.Recyclon = Recyclon;
//# sourceMappingURL=Recyclon.js.map