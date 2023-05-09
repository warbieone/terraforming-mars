"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StormCraftIncorporated = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardResource_1 = require("../../../common/CardResource");
const AndOptions_1 = require("../../inputs/AndOptions");
const SelectAmount_1 = require("../../inputs/SelectAmount");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const CardRenderer_1 = require("../render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
const Resource_1 = require("../../../common/Resource");
const ActionCard_1 = require("../ActionCard");
class StormCraftIncorporated extends ActionCard_1.ActionCard {
    constructor() {
        super({
            name: CardName_1.CardName.STORMCRAFT_INCORPORATED,
            tags: [Tag_1.Tag.JOVIAN],
            startingMegaCredits: 48,
            resourceType: CardResource_1.CardResource.FLOATER,
            type: CardType_1.CardType.CORPORATION,
            action: {
                addResourcesToAnyCard: { type: CardResource_1.CardResource.FLOATER, count: 1, autoSelect: true },
            },
            metadata: {
                cardNumber: 'R29',
                description: 'You start with 48 M€.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.br.br.br;
                    b.megacredits(48);
                    b.corpBox('action', (ce) => {
                        ce.vSpace(Size_1.Size.LARGE);
                        ce.action('Add a floater to ANY card.', (eb) => {
                            eb.empty().startAction.floaters(1).asterix();
                        });
                        ce.vSpace();
                        ce.effect('Floaters on this card may be used as 2 heat each.', (eb) => {
                            eb.startEffect.floaters(1).equals().heat(2);
                        });
                    });
                }),
            },
        });
    }
    spendHeat(player, targetAmount, cb = () => undefined) {
        let heatAmount;
        let floaterAmount;
        const options = new AndOptions_1.AndOptions(() => {
            if (heatAmount + (floaterAmount * 2) < targetAmount) {
                throw new Error(`Need to pay ${targetAmount} heat`);
            }
            if (heatAmount > 0 && heatAmount - 1 + (floaterAmount * 2) >= targetAmount) {
                throw new Error('You cannot overspend heat');
            }
            if (floaterAmount > 0 && heatAmount + ((floaterAmount - 1) * 2) >= targetAmount) {
                throw new Error('You cannot overspend floaters');
            }
            player.removeResourceFrom(this, floaterAmount);
            player.deductResource(Resource_1.Resource.HEAT, heatAmount);
            return cb();
        }, new SelectAmount_1.SelectAmount('Heat', 'Spend heat', (amount) => {
            heatAmount = amount;
            return undefined;
        }, 0, Math.min(player.heat, targetAmount)), new SelectAmount_1.SelectAmount('Stormcraft Incorporated Floaters (2 heat each)', 'Spend floaters', (amount) => {
            floaterAmount = amount;
            return undefined;
        }, 0, Math.min(this.resourceCount, Math.ceil(targetAmount / 2))));
        options.title = `Select how to spend ${targetAmount} heat`;
        return options;
    }
}
exports.StormCraftIncorporated = StormCraftIncorporated;
