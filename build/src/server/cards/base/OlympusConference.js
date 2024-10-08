"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OlympusConference = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const OrOptions_1 = require("../../inputs/OrOptions");
const SelectOption_1 = require("../../inputs/SelectOption");
const CardResource_1 = require("../../../common/CardResource");
const CardName_1 = require("../../../common/cards/CardName");
const Priority_1 = require("../../deferredActions/Priority");
const CardRenderer_1 = require("../render/CardRenderer");
class OlympusConference extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.OLYMPUS_CONFERENCE,
            tags: [Tag_1.Tag.SCIENCE, Tag_1.Tag.EARTH, Tag_1.Tag.BUILDING],
            cost: 10,
            resourceType: CardResource_1.CardResource.SCIENCE,
            victoryPoints: 1,
            metadata: {
                cardNumber: '185',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.tag(Tag_1.Tag.SCIENCE).colon().resource(CardResource_1.CardResource.SCIENCE).br;
                    b.or().br;
                    b.minus().resource(CardResource_1.CardResource.SCIENCE).plus().cards(1);
                }),
                description: 'When you play a science tag, including this, either add a science resource to this card, or remove a science resource from this card to draw a card.',
            },
        });
    }
    onCardPlayed(player, card) {
        const scienceTags = player.tags.cardTagCount(card, Tag_1.Tag.SCIENCE);
        this.onScienceTagAdded(player, scienceTags);
    }
    onColonyAddedToLeavitt(player) {
        this.onScienceTagAdded(player, 1);
    }
    onScienceTagAdded(player, count) {
        for (let i = 0; i < count; i++) {
            player.defer(() => {
                if (this.resourceCount === 0) {
                    player.addResourceTo(this, 1);
                    return undefined;
                }
                const options = new OrOptions_1.OrOptions(new SelectOption_1.SelectOption('Remove a science resource from this card to draw a card', 'Remove resource').andThen(() => {
                    player.removeResourceFrom(this);
                    player.drawCard();
                    return undefined;
                }), new SelectOption_1.SelectOption('Add a science resource to this card', 'Add resource').andThen(() => {
                    player.addResourceTo(this, 1);
                    return undefined;
                }));
                options.title = 'Select an option for Olympus Conference';
                return options;
            }, Priority_1.Priority.SUPERPOWER);
        }
        return undefined;
    }
}
exports.OlympusConference = OlympusConference;
