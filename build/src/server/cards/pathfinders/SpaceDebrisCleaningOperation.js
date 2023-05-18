"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpaceDebrisCleaningOperation = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Tag_1 = require("../../../common/cards/Tag");
const CardRequirements_1 = require("../requirements/CardRequirements");
const AddResourcesToCard_1 = require("../../deferredActions/AddResourcesToCard");
const CardResource_1 = require("../../../common/CardResource");
class SpaceDebrisCleaningOperation extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.EVENT,
            name: CardName_1.CardName.SPACE_DEBRIS_CLEANING_OPERATION,
            cost: 7,
            tags: [Tag_1.Tag.MARS, Tag_1.Tag.SPACE],
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.tag(Tag_1.Tag.SPACE, 4)),
            behavior: {
                stock: { titanium: 3 },
                addResourcesToAnyCard: { count: 1, type: CardResource_1.CardResource.DATA },
                drawCard: 1,
            },
            metadata: {
                cardNumber: 'Pf24',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.titanium(3).br;
                    b.wild(1).asterix().data().asterix().cards(1);
                }),
                description: 'Requires 4 space tags. Gain 3 titanium. ' +
                    'Add 1 resource to ANY card (not cards that take ANIMAL or SCIENCE resources.) ' +
                    'Add 1 data to ANY card. Draw 1 card.',
            },
        });
    }
    bespokePlay(player) {
        player.game.defer(new AddResourcesToCard_1.AddResourcesToCard(player, undefined, {
            count: 1,
            filter: (card) => {
                return card.resourceType !== undefined && card.resourceType !== CardResource_1.CardResource.SCIENCE && !card.tags.includes(Tag_1.Tag.ANIMAL);
            },
        }));
        return undefined;
    }
}
exports.SpaceDebrisCleaningOperation = SpaceDebrisCleaningOperation;
//# sourceMappingURL=SpaceDebrisCleaningOperation.js.map