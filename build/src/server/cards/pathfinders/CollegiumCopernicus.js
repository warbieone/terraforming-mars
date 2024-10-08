"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TradeWithCollegiumCopernicus = exports.tradeWithColony = exports.CollegiumCopernicus = void 0;
const CorporationCard_1 = require("../corporation/CorporationCard");
const Tag_1 = require("../../../common/cards/Tag");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const CardResource_1 = require("../../../common/CardResource");
const ColoniesHandler_1 = require("../../colonies/ColoniesHandler");
const SelectColony_1 = require("../../inputs/SelectColony");
const AddResourcesToCard_1 = require("../../deferredActions/AddResourcesToCard");
const MessageBuilder_1 = require("../../logs/MessageBuilder");
function tradeCost(player) {
    return Math.max(0, 3 - player.colonies.tradeDiscount);
}
class CollegiumCopernicus extends CorporationCard_1.CorporationCard {
    constructor() {
        super({
            name: CardName_1.CardName.COLLEGIUM_COPERNICUS,
            tags: [Tag_1.Tag.SCIENCE, Tag_1.Tag.EARTH],
            startingMegaCredits: 33,
            resourceType: CardResource_1.CardResource.DATA,
            behavior: {
                addResourcesToAnyCard: { count: 1, type: CardResource_1.CardResource.DATA },
            },
            firstAction: {
                text: 'Draw 2 cards with a science tag',
                drawCard: { count: 2, tag: Tag_1.Tag.SCIENCE },
            },
            metadata: {
                cardNumber: 'PfC16',
                description: 'You start with 33 M€. As your first action, draw 2 cards with a science tag.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.br;
                    b.megacredits(33).cards(2, { secondaryTag: Tag_1.Tag.SCIENCE }).br;
                    b.effect('When you play a card with a science tag (including this) Add 1 data to ANY card.', (eb) => {
                        eb.tag(Tag_1.Tag.SCIENCE).startEffect.resource(CardResource_1.CardResource.DATA).asterix();
                    }).br;
                    b.action('Spend 3 data from this card to trade.', (eb) => {
                        eb.resource(CardResource_1.CardResource.DATA, 3).startAction.trade();
                    });
                }),
            },
        });
    }
    onCorpCardPlayed(player, card) {
        this.onCardPlayed(player, card);
    }
    onCardPlayed(player, card) {
        if (player.tags.cardHasTag(card, Tag_1.Tag.SCIENCE) && player.isCorporation(this.name)) {
            player.game.defer(new AddResourcesToCard_1.AddResourcesToCard(player, CardResource_1.CardResource.DATA, { count: 1 }));
        }
    }
    canAct(player) {
        return player.colonies.canTrade() && this.resourceCount >= tradeCost(player);
    }
    action(player) {
        const game = player.game;
        player.defer(new SelectColony_1.SelectColony('Select colony tile to trade with', 'Select', ColoniesHandler_1.ColoniesHandler.tradeableColonies(game))
            .andThen((colony) => {
            tradeWithColony(this, player, colony);
            return undefined;
        }));
        return undefined;
    }
}
exports.CollegiumCopernicus = CollegiumCopernicus;
function tradeWithColony(card, player, colony) {
    const cost = tradeCost(player);
    card.resourceCount -= cost;
    player.game.log('${0} spent ${1} data from ${2} to trade with ${3}', (b) => b.player(player).number(cost).card(card).colony(colony));
    colony.trade(player);
}
exports.tradeWithColony = tradeWithColony;
class TradeWithCollegiumCopernicus {
    constructor(player) {
        this.player = player;
        this.collegiumCopernicus = player.getCorporation(CardName_1.CardName.COLLEGIUM_COPERNICUS);
    }
    canUse() {
        return (this.collegiumCopernicus?.resourceCount ?? 0) >= tradeCost(this.player) &&
            !this.player.getActionsThisGeneration().has(CardName_1.CardName.COLLEGIUM_COPERNICUS);
    }
    optionText() {
        return (0, MessageBuilder_1.message)('Pay ${0} data (use ${1} action)', (b) => b.number(tradeCost(this.player)).cardName(CardName_1.CardName.COLLEGIUM_COPERNICUS));
    }
    trade(colony) {
        this.player.addActionThisGeneration(CardName_1.CardName.COLLEGIUM_COPERNICUS);
        if (this.collegiumCopernicus !== undefined) {
            tradeWithColony(this.collegiumCopernicus, this.player, colony);
        }
    }
}
exports.TradeWithCollegiumCopernicus = TradeWithCollegiumCopernicus;
