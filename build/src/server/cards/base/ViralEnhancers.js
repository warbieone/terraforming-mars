"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViralEnhancers = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const OrOptions_1 = require("../../inputs/OrOptions");
const SelectOption_1 = require("../../inputs/SelectOption");
const CardName_1 = require("../../../common/cards/CardName");
const CardResource_1 = require("../../../common/CardResource");
const CardRenderer_1 = require("../render/CardRenderer");
const MessageBuilder_1 = require("../../logs/MessageBuilder");
class ViralEnhancers extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.VIRAL_ENHANCERS,
            tags: [Tag_1.Tag.SCIENCE, Tag_1.Tag.MICROBE],
            cost: 10,
            metadata: {
                cardNumber: '074',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.tag(Tag_1.Tag.PLANT).slash().tag(Tag_1.Tag.MICROBE).slash().tag(Tag_1.Tag.ANIMAL).br;
                    b.effect('When you play a plant, microbe, or an animal tag, including this, gain 1 plant or add 1 resource to THAT CARD.', (eb) => {
                        eb.empty().startEffect;
                        eb.plants(1).slash().resource(CardResource_1.CardResource.MICROBE).asterix().slash().resource(CardResource_1.CardResource.ANIMAL).asterix();
                    });
                }),
            },
        });
    }
    onCardPlayed(player, card) {
        const resourceCount = player.tags.cardTagCount(card, [Tag_1.Tag.ANIMAL, Tag_1.Tag.PLANT, Tag_1.Tag.MICROBE]);
        if (resourceCount === 0) {
            return undefined;
        }
        if (card.resourceType !== CardResource_1.CardResource.ANIMAL && card.resourceType !== CardResource_1.CardResource.MICROBE) {
            player.plants += resourceCount;
            return undefined;
        }
        for (let i = 0; i < resourceCount; i++) {
            player.defer(() => new OrOptions_1.OrOptions(new SelectOption_1.SelectOption((0, MessageBuilder_1.message)('Add resource to card ${0}', (b) => b.card(card)), 'Add resource').andThen(() => {
                player.addResourceTo(card);
                return undefined;
            }), new SelectOption_1.SelectOption('Gain plant').andThen(() => {
                player.plants++;
                return undefined;
            })));
        }
        return undefined;
    }
}
exports.ViralEnhancers = ViralEnhancers;
