"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Faraday = void 0;
const mnemonist_1 = require("mnemonist");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const CardRenderer_1 = require("../render/CardRenderer");
const CeoCard_1 = require("./CeoCard");
const Size_1 = require("../../../common/cards/render/Size");
const AltSecondaryTag_1 = require("../../../common/cards/render/AltSecondaryTag");
const Tag_1 = require("../../../common/cards/Tag");
const SelectOption_1 = require("../../inputs/SelectOption");
const OrOptions_1 = require("../../inputs/OrOptions");
const SelectPaymentDeferred_1 = require("../../deferredActions/SelectPaymentDeferred");
const MessageBuilder_1 = require("../../logs/MessageBuilder");
const titles_1 = require("../../inputs/titles");
const INVALID_TAGS = [
    Tag_1.Tag.EVENT,
    Tag_1.Tag.WILD,
];
class Faraday extends CeoCard_1.CeoCard {
    constructor() {
        super({
            name: CardName_1.CardName.FARADAY,
            metadata: {
                cardNumber: 'L27',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.br;
                    b.text('5', Size_1.Size.LARGE).diverseTag(1).colon().megacredits(-3).cards(1, { secondaryTag: AltSecondaryTag_1.AltSecondaryTag.DIVERSE }).asterix();
                    b.br.br;
                }),
                description: 'When you gain a multiple of 5 for any tag type IN PLAY, you may pay 3 M€ to draw a card with that tag. Wild tags do not count for this effect.',
            },
        });
    }
    canAct() {
        return false;
    }
    countTags(player) {
        const record = {};
        for (const entry of player.tags.countAllTags()) {
            record[entry.tag] = entry.count;
        }
        return record;
    }
    gainedMultiple(tagsOnCard, total) {
        const priorTagCount = total - tagsOnCard;
        return priorTagCount % 5 + tagsOnCard >= 5;
    }
    onCardPlayed(player, card) {
        if (card.tags.length === 0 || card.type === CardType_1.CardType.EVENT || !player.canAfford(2))
            return;
        const counts = this.countTags(player);
        const tagsOnCard = mnemonist_1.MultiSet.from(card.tags);
        tagsOnCard.forEachMultiplicity((countOnCard, tagOnCard) => {
            if (INVALID_TAGS.includes(tagOnCard))
                return;
            if (this.gainedMultiple(countOnCard, counts[tagOnCard])) {
                player.defer(this.effectOptions(player, tagOnCard));
            }
        });
    }
    effectOptions(player, tag) {
        if (!player.canAfford(3))
            return;
        return new OrOptions_1.OrOptions(new SelectOption_1.SelectOption((0, MessageBuilder_1.message)('Pay 3 M€ to draw a ${1} card', (b) => b.string(tag))).andThen(() => {
            player.game.defer(new SelectPaymentDeferred_1.SelectPaymentDeferred(player, 3, { title: titles_1.TITLES.payForCardAction(this.name) }))
                .andThen(() => player.drawCard(1, { tag: tag }));
            return undefined;
        }), new SelectOption_1.SelectOption('Do nothing'));
    }
}
exports.Faraday = Faraday;
