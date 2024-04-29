"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectWorkshop = void 0;
const CorporationCard_1 = require("../corporation/CorporationCard");
const Tag_1 = require("../../../common/cards/Tag");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const SelectCard_1 = require("../../inputs/SelectCard");
const OrOptions_1 = require("../../inputs/OrOptions");
const SelectOption_1 = require("../../inputs/SelectOption");
const CardRenderer_1 = require("../render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
const AltSecondaryTag_1 = require("../../../common/cards/render/AltSecondaryTag");
const Options_1 = require("../Options");
const PartyHooks_1 = require("../../turmoil/parties/PartyHooks");
const PartyName_1 = require("../../../common/turmoil/PartyName");
const constants_1 = require("../../../common/constants");
const SelectPaymentDeferred_1 = require("../../deferredActions/SelectPaymentDeferred");
const titles_1 = require("../../inputs/titles");
class ProjectWorkshop extends CorporationCard_1.CorporationCard {
    constructor() {
        super({
            name: CardName_1.CardName.PROJECT_WORKSHOP,
            tags: [Tag_1.Tag.EARTH],
            startingMegaCredits: 39,
            behavior: {
                stock: { steel: 1, titanium: 1 },
            },
            firstAction: {
                text: 'Draw a blue card',
                drawCard: { count: 1, type: CardType_1.CardType.ACTIVE },
            },
            metadata: {
                cardNumber: 'R45',
                description: 'You start with 39 M€, 1 steel and 1 titanium. As your first action, draw a blue card.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.megacredits(39).steel(1).titanium(1).cards(1, { secondaryTag: AltSecondaryTag_1.AltSecondaryTag.BLUE });
                    b.corpBox('action', (cb) => {
                        cb.vSpace(Size_1.Size.LARGE);
                        cb.action(undefined, (eb) => {
                            eb.text('flip', Size_1.Size.SMALL, true).cards(1, { secondaryTag: AltSecondaryTag_1.AltSecondaryTag.BLUE });
                            eb.startAction.text('?', Size_1.Size.MEDIUM, true).tr(1, { size: Size_1.Size.SMALL });
                            eb.cards(2, { digit: Options_1.digit });
                        });
                        cb.vSpace(Size_1.Size.SMALL);
                        cb.action('Flip and discard a played blue card to convert any VP on it into TR and draw 2 cards, or spend 3 M€ to draw a blue card.', (eb) => {
                            eb.or().megacredits(3).startAction.cards(1, { secondaryTag: AltSecondaryTag_1.AltSecondaryTag.BLUE });
                        });
                    });
                }),
            },
        });
    }
    getEligibleCards(player) {
        const cards = player.playedCards.filter((card) => card.type === CardType_1.CardType.ACTIVE);
        if (!PartyHooks_1.PartyHooks.shouldApplyPolicy(player, PartyName_1.PartyName.REDS, 'rp01')) {
            return cards;
        }
        return cards.filter((card) => {
            const vp = card.getVictoryPoints(player);
            if (vp <= 0) {
                return true;
            }
            return player.canAfford(constants_1.REDS_RULING_POLICY_COST * vp);
        });
    }
    canAct(player) {
        return player.canAfford(3) || this.getEligibleCards(player).length > 0;
    }
    action(player) {
        const activeCards = this.getEligibleCards(player);
        const flipBlueCard = new SelectOption_1.SelectOption('Flip and discard a played blue card', 'Select')
            .andThen(() => {
            if (activeCards.length === 1) {
                this.convertCardPointsToTR(player, activeCards[0]);
                player.discardPlayedCard(activeCards[0]);
                player.drawCard(2);
                return undefined;
            }
            return new SelectCard_1.SelectCard('Select active card to discard', 'Discard', activeCards)
                .andThen(([card]) => {
                this.convertCardPointsToTR(player, card);
                player.discardPlayedCard(card);
                player.drawCard(2);
                return undefined;
            });
        });
        const drawBlueCard = new SelectOption_1.SelectOption('Spend 3 M€ to draw a blue card', 'Draw card').andThen(() => {
            player.game.defer(new SelectPaymentDeferred_1.SelectPaymentDeferred(player, 3, { title: titles_1.TITLES.payForCardAction(this.name) }))
                .andThen(() => player.drawCard(1, { cardType: CardType_1.CardType.ACTIVE }));
            return undefined;
        });
        if (activeCards.length === 0)
            return drawBlueCard;
        if (!player.canAfford(3))
            return flipBlueCard;
        return new OrOptions_1.OrOptions(drawBlueCard, flipBlueCard);
    }
    convertCardPointsToTR(player, card) {
        const steps = card.getVictoryPoints(player);
        if (steps > 0) {
            player.increaseTerraformRating(steps, { log: true });
        }
        else if (steps < 0) {
            player.decreaseTerraformRating(-steps, { log: true });
        }
    }
}
exports.ProjectWorkshop = ProjectWorkshop;
