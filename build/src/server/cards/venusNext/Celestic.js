"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Celestic = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardResource_1 = require("../../../common/CardResource");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const CardRenderer_1 = require("../render/CardRenderer");
const AltSecondaryTag_1 = require("../../../common/cards/render/AltSecondaryTag");
const LogHelper_1 = require("../../LogHelper");
const SelectCard_1 = require("../../inputs/SelectCard");
const Card_1 = require("../Card");
class Celestic extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.CELESTIC,
            tags: [Tag_1.Tag.VENUS],
            startingMegaCredits: 42,
            resourceType: CardResource_1.CardResource.FLOATER,
            type: CardType_1.CardType.CORPORATION,
            initialActionText: 'Draw 2 cards with a floater icon on it',
            victoryPoints: { resourcesHere: {}, per: 3 },
            metadata: {
                cardNumber: 'R05',
                description: 'You start with 42 M€. As your first action, reveal cards from the deck until you have revealed 2 cards with a floater icon on it. Take them into hand and discard the rest.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.megacredits(42).nbsp.cards(2, { secondaryTag: AltSecondaryTag_1.AltSecondaryTag.FLOATER });
                    b.corpBox('action', (ce) => {
                        ce.action('Action: Add a floater each to 1 or 2 different cards. 1 VP per 3 floaters on this card.', (eb) => {
                            eb.empty().startAction.floaters(1).asterix().floaters(1).asterix();
                        });
                        ce.vSpace();
                    });
                }),
            },
        });
    }
    canAct() {
        return true;
    }
    action(player) {
        const floaterCards = player.getResourceCards(CardResource_1.CardResource.FLOATER);
        if (floaterCards.length === 1) {
            player.addResourceTo(this, 1);
            LogHelper_1.LogHelper.logAddResource(player, floaterCards[0]);
            return undefined;
        }
        if (floaterCards.length === 2) {
            player.addResourceTo(floaterCards[0], 1);
            LogHelper_1.LogHelper.logAddResource(player, floaterCards[0]);
            player.addResourceTo(floaterCards[1], 1);
            LogHelper_1.LogHelper.logAddResource(player, floaterCards[1]);
            return undefined;
        }
        return new SelectCard_1.SelectCard('Select 2 different cards to add 1 floater each', 'Add floaters', floaterCards, (foundCards) => {
            foundCards.forEach((floaterCard) => {
                player.addResourceTo(floaterCard, { qty: 1, log: true });
            });
            return undefined;
        }, { max: 2, min: 2 });
    }
    initialAction(player) {
        player.drawCard(2, {
            include: (card) => Celestic.floaterCards.has(card.name) || card.resourceType === CardResource_1.CardResource.FLOATER,
        });
        return undefined;
    }
}
exports.Celestic = Celestic;
Celestic.floaterCards = new Set([
    CardName_1.CardName.AEROSPORT_TOURNAMENT,
    CardName_1.CardName.AIR_SCRAPPING_EXPEDITION,
    CardName_1.CardName.ATMOSCOOP,
    CardName_1.CardName.HYDROGEN_TO_VENUS,
    CardName_1.CardName.STRATOSPHERIC_BIRDS,
    CardName_1.CardName.AIRLINERS,
    CardName_1.CardName.AIR_RAID,
    CardName_1.CardName.FLOATER_LEASING,
    CardName_1.CardName.FLOATER_PROTOTYPES,
    CardName_1.CardName.FLOATER_TECHNOLOGY,
    CardName_1.CardName.NITROGEN_FROM_TITAN,
    CardName_1.CardName.CASSINI_STATION,
    CardName_1.CardName.FLOATER_URBANISM,
    CardName_1.CardName.NOBEL_LABS,
    CardName_1.CardName.SECRET_LABS,
    CardName_1.CardName.VENERA_BASE,
]);
//# sourceMappingURL=Celestic.js.map