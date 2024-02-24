"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TradeWithTitanFloatingLaunchPad = exports.TitanFloatingLaunchPad = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardResource_1 = require("../../../common/CardResource");
const SelectOption_1 = require("../../inputs/SelectOption");
const OrOptions_1 = require("../../inputs/OrOptions");
const AddResourcesToCard_1 = require("../../deferredActions/AddResourcesToCard");
const SelectColony_1 = require("../../inputs/SelectColony");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
const ColoniesHandler_1 = require("../../colonies/ColoniesHandler");
const MessageBuilder_1 = require("../../logs/MessageBuilder");
class TitanFloatingLaunchPad extends Card_1.Card {
    constructor() {
        super({
            cost: 18,
            tags: [Tag_1.Tag.JOVIAN],
            name: CardName_1.CardName.TITAN_FLOATING_LAUNCHPAD,
            type: CardType_1.CardType.ACTIVE,
            resourceType: CardResource_1.CardResource.FLOATER,
            victoryPoints: 1,
            behavior: {
                addResourcesToAnyCard: { type: CardResource_1.CardResource.FLOATER, count: 2, tag: Tag_1.Tag.JOVIAN },
            },
            metadata: {
                cardNumber: 'C44',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action(undefined, (eb) => {
                        eb.empty().startAction.floaters(1, { secondaryTag: Tag_1.Tag.JOVIAN }).nbsp.or();
                    }).br;
                    b.action('Add 1 floater to ANY JOVIAN CARD or spend 1 floater here to trade for free.', (eb) => {
                        eb.floaters(1).startAction.trade();
                    }).br.br;
                    b.floaters(2, { secondaryTag: Tag_1.Tag.JOVIAN });
                }),
                description: {
                    text: 'Add two floaters to ANY JOVIAN CARD.',
                    align: 'left',
                },
            },
        });
    }
    canAct() {
        return true;
    }
    action(player) {
        const orOptions = new OrOptions_1.OrOptions(new SelectOption_1.SelectOption('Remove 1 floater on this card to trade for free', 'Remove floater').andThen(() => {
            player.defer(new SelectColony_1.SelectColony('Select colony tile to trade with for free', 'Select', ColoniesHandler_1.ColoniesHandler.tradeableColonies(player.game))
                .andThen((colony) => {
                this.resourceCount--;
                player.game.log('${0} spent 1 floater to trade with ${1}', (b) => b.player(player).colony(colony));
                colony.trade(player);
                return undefined;
            }));
            return undefined;
        }), new SelectOption_1.SelectOption('Add 1 floater to a Jovian card', 'Add floater').andThen(() => {
            player.game.defer(new AddResourcesToCard_1.AddResourcesToCard(player, CardResource_1.CardResource.FLOATER, { restrictedTag: Tag_1.Tag.JOVIAN, title: 'Add 1 floater to a Jovian card' }));
            return undefined;
        }));
        if (this.resourceCount === 0 || !player.colonies.canTrade()) {
            return orOptions.options[1].cb();
        }
        return orOptions;
    }
}
exports.TitanFloatingLaunchPad = TitanFloatingLaunchPad;
class TradeWithTitanFloatingLaunchPad {
    constructor(player) {
        this.player = player;
        const card = player.playedCards.find((card) => card.name === CardName_1.CardName.TITAN_FLOATING_LAUNCHPAD);
        this.titanFloatingLaunchPad = card === undefined ? undefined : card;
    }
    canUse() {
        return (this.titanFloatingLaunchPad?.resourceCount ?? 0) > 0 &&
            !this.player.getActionsThisGeneration().has(CardName_1.CardName.TITAN_FLOATING_LAUNCHPAD);
    }
    optionText() {
        return (0, MessageBuilder_1.message)('Pay 1 floater (use ${0} action)', (b) => b.cardName(CardName_1.CardName.TITAN_FLOATING_LAUNCHPAD));
    }
    trade(colony) {
        if (this.titanFloatingLaunchPad !== undefined) {
            this.titanFloatingLaunchPad.resourceCount--;
        }
        this.player.addActionThisGeneration(CardName_1.CardName.TITAN_FLOATING_LAUNCHPAD);
        this.player.game.log('${0} spent 1 floater to trade with ${1}', (b) => b.player(this.player).colony(colony));
        colony.trade(this.player);
    }
}
exports.TradeWithTitanFloatingLaunchPad = TradeWithTitanFloatingLaunchPad;
