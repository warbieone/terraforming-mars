"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValuableGases = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const PreludeCard_1 = require("../prelude/PreludeCard");
const CardName_1 = require("../../../common/cards/CardName");
const CardResource_1 = require("../../../common/CardResource");
const CardRenderer_1 = require("../render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
const AltSecondaryTag_1 = require("../../../common/cards/render/AltSecondaryTag");
const Resource_1 = require("../../../common/Resource");
const Options_1 = require("../Options");
const CardType_1 = require("../../../common/cards/CardType");
const SelectProjectCardToPlay_1 = require("../../inputs/SelectProjectCardToPlay");
class ValuableGases extends PreludeCard_1.PreludeCard {
    constructor() {
        super({
            name: CardName_1.CardName.VALUABLE_GASES_PATHFINDERS,
            tags: [Tag_1.Tag.JOVIAN, Tag_1.Tag.VENUS],
            globalParameterRequirementBonus: { steps: 50, nextCardOnly: true },
            metadata: {
                cardNumber: 'PfP02',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.megacredits(10).br;
                    b.text('play', Size_1.Size.MEDIUM, true).cards(1, { secondaryTag: AltSecondaryTag_1.AltSecondaryTag.FLOATER }).asterix().br;
                    b.resource(CardResource_1.CardResource.FLOATER, { amount: 5, digit: Options_1.digit });
                }),
                description: 'Gain 10 M€. Play an active floater card from hand, ignoring requirements, and add 5 floaters to it.',
            },
        });
    }
    bespokePlay(player) {
        player.stock.add(Resource_1.Resource.MEGACREDITS, 10);
        const playableCards = player.cardsInHand.filter((card) => {
            return card.resourceType === CardResource_1.CardResource.FLOATER &&
                card.type === CardType_1.CardType.ACTIVE &&
                player.canAfford(player.affordOptionsForCard(card));
        }).map((card) => {
            return {
                card: card,
                details: true,
            };
        });
        if (playableCards.length !== 0) {
            player.defer(new SelectProjectCardToPlay_1.SelectProjectCardToPlay(player, playableCards)
                .andThen((card) => {
                player.addResourceTo(card, 5);
                return undefined;
            }));
        }
        return undefined;
    }
}
exports.ValuableGases = ValuableGases;
