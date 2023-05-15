"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BioengineeringEnclosure = void 0;
const Card_1 = require("../Card");
const CardName_1 = require("../../../common/cards/CardName");
const CardResource_1 = require("../../../common/CardResource");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const SelectCard_1 = require("../../inputs/SelectCard");
const DeferredAction_1 = require("../../deferredActions/DeferredAction");
const CardRequirements_1 = require("../CardRequirements");
const CardRenderer_1 = require("../render/CardRenderer");
class BioengineeringEnclosure extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.BIOENGINEERING_ENCLOSURE,
            tags: [Tag_1.Tag.ANIMAL],
            cost: 7,
            resourceType: CardResource_1.CardResource.ANIMAL,
            behavior: {
                addResources: 2,
            },
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.tag(Tag_1.Tag.SCIENCE)),
            metadata: {
                description: 'Requires 1 science tag to play. Add 2 animals to this card. OTHERS MAY NOT REMOVE ANIMALS FROM THIS CARD.',
                cardNumber: 'A01',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Remove 1 animal from THIS card to add 1 animal to ANOTHER card.', (eb) => {
                        eb.animals(1).asterix().startAction.animals(1).asterix();
                    }).br;
                    b.animals(2);
                }),
            },
        });
    }
    canAct(player) {
        return this.resourceCount > 0 && player.getResourceCards(this.resourceType).length > 1;
    }
    action(player) {
        player.game.defer(new DeferredAction_1.SimpleDeferredAction(player, () => {
            const resourceCards = player.getResourceCards(this.resourceType).filter((card) => card.name !== CardName_1.CardName.BIOENGINEERING_ENCLOSURE);
            if (resourceCards.length === 0) {
                return undefined;
            }
            if (resourceCards.length === 1) {
                this.resourceCount--;
                player.addResourceTo(resourceCards[0], 1);
                player.game.log('${0} moved 1 animal from Bioengineering Enclosure to ${1}.', (b) => b.player(player).card(resourceCards[0]));
                return undefined;
            }
            return new SelectCard_1.SelectCard('Select card to add 1 animal', 'Add animal', resourceCards, ([card]) => {
                this.resourceCount--;
                player.addResourceTo(card, 1);
                player.game.log('${0} moved 1 animal from Bioengineering Enclosure to ${1}.', (b) => b.player(player).card(card));
                return undefined;
            });
        }));
        return undefined;
    }
}
exports.BioengineeringEnclosure = BioengineeringEnclosure;
//# sourceMappingURL=BioengineeringEnclosure.js.map