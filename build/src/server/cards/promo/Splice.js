"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Splice = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const SelectOption_1 = require("../../inputs/SelectOption");
const OrOptions_1 = require("../../inputs/OrOptions");
const CardResource_1 = require("../../../common/CardResource");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const CardRenderer_1 = require("../render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
const Resource_1 = require("../../../common/Resource");
const Options_1 = require("../Options");
const MessageBuilder_1 = require("../../logs/MessageBuilder");
class Splice extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.CORPORATION,
            name: CardName_1.CardName.SPLICE,
            tags: [Tag_1.Tag.MICROBE],
            startingMegaCredits: 48,
            firstAction: {
                text: 'Draw a card with a microbe tag',
                drawCard: { count: 1, tag: Tag_1.Tag.MICROBE },
            },
            metadata: {
                cardNumber: 'R28',
                description: 'You start with 44 M€. As your first action, reveal cards until you have revealed a microbe tag. Take it and discard the rest.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.megacredits(44).nbsp.cards(1, { secondaryTag: Tag_1.Tag.MICROBE });
                    b.corpBox('effect', (ce) => {
                        ce.vSpace(Size_1.Size.LARGE);
                        ce.effect(undefined, (eb) => {
                            eb.microbes(1, { played: Options_1.played, all: Options_1.all }).startEffect;
                            eb.megacredits(2, { all: Options_1.all }).or().microbes(1, { all: Options_1.all }).asterix();
                        });
                        ce.vSpace();
                        ce.effect('when a microbe tag is played, incl. this, THAT PLAYER gains 2 M€, or adds a microbe to THAT card, and you gain 2 M€.', (eb) => {
                            eb.microbes(1, { played: Options_1.played, all: Options_1.all }).startEffect;
                            eb.megacredits(2);
                        });
                    });
                }),
            },
        });
    }
    onCardPlayed(player, card) {
        return this._onCardPlayed(player, card);
    }
    onCorpCardPlayed(player, card) {
        return this._onCardPlayed(player, card);
    }
    _onCardPlayed(player, card) {
        if (card.tags.includes(Tag_1.Tag.MICROBE) === false) {
            return undefined;
        }
        const gainPerMicrobe = 2;
        const microbeTagsCount = player.tags.cardTagCount(card, Tag_1.Tag.MICROBE);
        const megacreditsGain = microbeTagsCount * gainPerMicrobe;
        const addResource = new SelectOption_1.SelectOption('Add a microbe resource to this card', 'Add microbe', () => {
            player.addResourceTo(card);
            return undefined;
        });
        const getMegacredits = new SelectOption_1.SelectOption((0, MessageBuilder_1.newMessage)('Gain ${0} M€', (b) => b.number(megacreditsGain)), 'Gain M€', () => {
            player.addResource(Resource_1.Resource.MEGACREDITS, megacreditsGain, { log: true });
            return undefined;
        });
        player.game.getCardPlayerOrThrow(this.name).addResource(Resource_1.Resource.MEGACREDITS, megacreditsGain, { log: true });
        if (card.resourceType === CardResource_1.CardResource.MICROBE) {
            return new OrOptions_1.OrOptions(addResource, getMegacredits);
        }
        else {
            player.addResource(Resource_1.Resource.MEGACREDITS, megacreditsGain, { log: true });
            return undefined;
        }
    }
}
exports.Splice = Splice;
