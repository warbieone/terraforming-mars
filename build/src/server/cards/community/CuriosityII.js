"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CuriosityII = void 0;
const Card_1 = require("../Card");
const Tag_1 = require("../../../common/cards/Tag");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const CardRenderer_1 = require("../render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
const DeferredAction_1 = require("../../deferredActions/DeferredAction");
const OrOptions_1 = require("../../inputs/OrOptions");
const SelectOption_1 = require("../../inputs/SelectOption");
const SelectPaymentDeferred_1 = require("../../deferredActions/SelectPaymentDeferred");
const DrawCards_1 = require("../../deferredActions/DrawCards");
const SpaceType_1 = require("../../../common/boards/SpaceType");
const SpaceBonus_1 = require("../../../common/boards/SpaceBonus");
const Phase_1 = require("../../../common/Phase");
class CuriosityII extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.CORPORATION,
            name: CardName_1.CardName.CURIOSITY_II,
            tags: [Tag_1.Tag.SCIENCE, Tag_1.Tag.BUILDING],
            startingMegaCredits: 40,
            behavior: {
                production: { steel: 2 },
            },
            metadata: {
                cardNumber: '',
                description: 'You start with 40 M€ and 2 steel production.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.br.br;
                    b.megacredits(40).nbsp.production((pb) => pb.steel(2));
                    b.corpBox('effect', (ce) => {
                        ce.vSpace();
                        ce.effect('When you place a tile on an area that has a RESOURCE placement bonus, ' +
                            'or on top of another tile, you may pay 2 M€ to draw a card.', (eb) => {
                            eb.emptyTile('normal', { size: Size_1.Size.SMALL }).nbsp.asterix().startEffect.megacredits(-2).cards(1);
                        });
                    });
                }),
            },
        });
    }
    onTilePlaced(cardOwner, activePlayer, space) {
        var _a;
        const eligibleBonuses = [SpaceBonus_1.SpaceBonus.STEEL, SpaceBonus_1.SpaceBonus.TITANIUM, SpaceBonus_1.SpaceBonus.HEAT, SpaceBonus_1.SpaceBonus.PLANT, SpaceBonus_1.SpaceBonus.MEGACREDITS, SpaceBonus_1.SpaceBonus.ANIMAL, SpaceBonus_1.SpaceBonus.MICROBE, SpaceBonus_1.SpaceBonus.ENERGY];
        if (cardOwner.id !== activePlayer.id)
            return;
        if (cardOwner.game.phase === Phase_1.Phase.SOLAR)
            return;
        if (space.spaceType === SpaceType_1.SpaceType.COLONY)
            return;
        if (space.bonus.some((bonus) => eligibleBonuses.includes(bonus)) || ((_a = space.tile) === null || _a === void 0 ? void 0 : _a.covers) !== undefined) {
            cardOwner.game.defer(new DeferredAction_1.SimpleDeferredAction(cardOwner, () => this.corpAction(cardOwner)));
        }
    }
    corpAction(player) {
        if (!player.canAfford(2))
            return undefined;
        return new OrOptions_1.OrOptions(new SelectOption_1.SelectOption('Pay 2 M€ to draw a card', 'Confirm', () => {
            player.game.defer(new SelectPaymentDeferred_1.SelectPaymentDeferred(player, 2, { title: 'Select how to pay for action' }));
            player.game.defer(DrawCards_1.DrawCards.keepAll(player));
            return undefined;
        }), new SelectOption_1.SelectOption('Do nothing', 'Confirm', () => {
            return undefined;
        }));
    }
}
exports.CuriosityII = CuriosityII;
