"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EcologyResearch = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const Resource_1 = require("../../../common/Resource");
const CardResource_1 = require("../../../common/CardResource");
const AddResourcesToCard_1 = require("../../deferredActions/AddResourcesToCard");
const Size_1 = require("../../../common/cards/render/Size");
const Card_1 = require("../Card");
const CardRenderer_1 = require("../render/CardRenderer");
class EcologyResearch extends Card_1.Card {
    constructor() {
        super({
            cost: 21,
            tags: [Tag_1.Tag.SCIENCE, Tag_1.Tag.PLANT, Tag_1.Tag.ANIMAL, Tag_1.Tag.MICROBE],
            name: CardName_1.CardName.ECOLOGY_RESEARCH,
            type: CardType_1.CardType.AUTOMATED,
            victoryPoints: 1,
            metadata: {
                description: 'Increase your plant production 1 step for each colony you own. Add 1 animal to ANOTHER card and 2 microbes to ANOTHER card.',
                cardNumber: 'C09',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.plants(1).slash().colonies(1, { size: Size_1.Size.SMALL })).br;
                    b.animals(1).asterix().nbsp.nbsp.microbes(2).asterix();
                }),
            },
        });
    }
    bespokePlay(player) {
        const coloniesCount = player.getColoniesCount();
        player.production.add(Resource_1.Resource.PLANTS, coloniesCount, { log: true });
        const animalCards = player.getResourceCards(CardResource_1.CardResource.ANIMAL);
        if (animalCards.length) {
            player.game.defer(new AddResourcesToCard_1.AddResourcesToCard(player, CardResource_1.CardResource.ANIMAL, { count: 1 }));
        }
        const microbeCards = player.getResourceCards(CardResource_1.CardResource.MICROBE);
        if (microbeCards.length) {
            player.game.defer(new AddResourcesToCard_1.AddResourcesToCard(player, CardResource_1.CardResource.MICROBE, { count: 2 }));
        }
        return undefined;
    }
}
exports.EcologyResearch = EcologyResearch;
