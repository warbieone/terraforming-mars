"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NobelLabs = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Tag_1 = require("../../../common/cards/Tag");
const CardRequirements_1 = require("../requirements/CardRequirements");
const CardResource_1 = require("../../../common/CardResource");
const AddResourcesToCard_1 = require("../../deferredActions/AddResourcesToCard");
const Options_1 = require("../Options");
class NobelLabs extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.NOBEL_LABS,
            cost: 8,
            tags: [Tag_1.Tag.PLANT, Tag_1.Tag.ANIMAL, Tag_1.Tag.MARS],
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.tag(Tag_1.Tag.SCIENCE, 4)),
            metadata: {
                cardNumber: 'Pf55',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Add 2 microbes OR 2 data OR 2 floaters to ANY card.', (eb) => {
                        eb.empty().startAction.microbes(2, { digit: Options_1.digit }).slash().data({ amount: 2, digit: Options_1.digit }).slash().floaters(2, { digit: Options_1.digit }).asterix();
                    });
                }),
                description: 'Requires 4 science tags.',
            },
        });
    }
    canAct(player) {
        return player.getResourceCards().some(NobelLabs.PREDICATE);
    }
    action(player) {
        player.game.defer(new AddResourcesToCard_1.AddResourcesToCard(player, undefined, { filter: NobelLabs.PREDICATE, count: 2 }));
        return undefined;
    }
}
exports.NobelLabs = NobelLabs;
NobelLabs.RESOURCE_TYPES = [CardResource_1.CardResource.MICROBE, CardResource_1.CardResource.DATA, CardResource_1.CardResource.FLOATER];
NobelLabs.PREDICATE = (card) => card.resourceType !== undefined && NobelLabs.RESOURCE_TYPES.includes(card.resourceType);
//# sourceMappingURL=NobelLabs.js.map