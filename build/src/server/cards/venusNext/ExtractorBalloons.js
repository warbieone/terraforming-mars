"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtractorBalloons = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardResource_1 = require("../../../common/CardResource");
const OrOptions_1 = require("../../inputs/OrOptions");
const SelectOption_1 = require("../../inputs/SelectOption");
const CardName_1 = require("../../../common/cards/CardName");
const constants_1 = require("../../../common/constants");
const LogHelper_1 = require("../../LogHelper");
const CardRenderer_1 = require("../render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
const Card_1 = require("../Card");
class ExtractorBalloons extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.EXTRACTOR_BALLOONS,
            type: CardType_1.CardType.ACTIVE,
            tags: [Tag_1.Tag.VENUS],
            cost: 21,
            resourceType: CardResource_1.CardResource.FLOATER,
            behavior: {
                addResources: 3,
            },
            metadata: {
                cardNumber: '223',
                description: 'Add 3 floaters to this card',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Add 1 floater to this card.', (eb) => {
                        eb.empty().startAction.floaters(1);
                    }).br;
                    b.action('Remove 2 floaters here to raise Venus 1 step.', (eb) => {
                        eb.or(Size_1.Size.SMALL).floaters(2).startAction.venus(1);
                    }).br.floaters(3);
                }),
            },
        });
    }
    canAct() {
        return true;
    }
    action(player) {
        const venusMaxed = player.game.getVenusScaleLevel() === constants_1.MAX_VENUS_SCALE;
        const canAffordReds = player.canAfford(0, { tr: { venus: 1 } });
        if (this.resourceCount < 2 || venusMaxed || !canAffordReds) {
            player.addResourceTo(this, { log: true });
            return undefined;
        }
        return new OrOptions_1.OrOptions(new SelectOption_1.SelectOption('Remove 2 floaters to raise Venus scale 1 step', 'Remove floaters', () => {
            player.removeResourceFrom(this, 2);
            const actual = player.game.increaseVenusScaleLevel(player, 1);
            LogHelper_1.LogHelper.logVenusIncrease(player, actual);
            return undefined;
        }), new SelectOption_1.SelectOption('Add 1 floater to this card', 'Add floater', () => {
            player.addResourceTo(this, { log: true });
            return undefined;
        }));
    }
}
exports.ExtractorBalloons = ExtractorBalloons;
