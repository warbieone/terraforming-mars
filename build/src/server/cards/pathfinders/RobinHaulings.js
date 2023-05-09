"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RobinHaulings = void 0;
const Card_1 = require("../Card");
const Tag_1 = require("../../../common/cards/Tag");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const CardRenderer_1 = require("../render/CardRenderer");
const CardResource_1 = require("../../../common/CardResource");
const AddResourcesToCard_1 = require("../../deferredActions/AddResourcesToCard");
const Options_1 = require("../Options");
const constants_1 = require("../../../common/constants");
const OrOptions_1 = require("../../inputs/OrOptions");
const SelectOption_1 = require("../../inputs/SelectOption");
class RobinHaulings extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.CORPORATION,
            name: CardName_1.CardName.ROBIN_HAULINGS,
            tags: [Tag_1.Tag.MARS, Tag_1.Tag.VENUS],
            startingMegaCredits: 39,
            resourceType: CardResource_1.CardResource.FLOATER,
            behavior: {
                addResources: 1,
            },
            metadata: {
                cardNumber: 'PfC9',
                description: 'You start with 39 M€.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.megacredits(39).br;
                    b.effect('Whenever you play a card with a Venus tag add 1 floater to ANY card.', (eb) => {
                        eb.venus(1, { played: Options_1.played }).startEffect.floaters(1).asterix();
                    });
                    b.br;
                    b.action('Remove 3 floaters from this card to raise Venus 1 step or raise oxygen 1 step', (ab) => {
                        ab.floaters(3, { digit: true }).startAction.venus(1).or().oxygen(1);
                    });
                }),
            },
        });
    }
    onCardPlayed(player, card) {
        if (player.isCorporation(CardName_1.CardName.ROBIN_HAULINGS) && card.tags.includes(Tag_1.Tag.VENUS)) {
            player.game.defer(new AddResourcesToCard_1.AddResourcesToCard(player, CardResource_1.CardResource.FLOATER));
        }
    }
    canRaiseVenus(player) {
        return player.game.getVenusScaleLevel() < constants_1.MAX_VENUS_SCALE && player.canAfford(0, { tr: { venus: 1 } });
    }
    canRaiseOxygen(player) {
        return player.game.getOxygenLevel() < constants_1.MAX_OXYGEN_LEVEL && player.canAfford(0, { tr: { oxygen: 1 } });
    }
    canAct(player) {
        if (this.resourceCount < 3)
            return false;
        return this.canRaiseVenus(player) || this.canRaiseOxygen(player);
    }
    action(player) {
        const options = new OrOptions_1.OrOptions();
        if (this.canRaiseVenus(player)) {
            options.options.push(new SelectOption_1.SelectOption('Spend 3 floaters to raise Venus 1 step', 'OK', () => {
                player.game.increaseVenusScaleLevel(player, 1);
                this.resourceCount -= 3;
                return undefined;
            }));
        }
        if (this.canRaiseOxygen(player)) {
            options.options.push(new SelectOption_1.SelectOption('Spend 3 floaters to raise oxygen 1 step', 'OK', () => {
                player.game.increaseOxygenLevel(player, 1);
                this.resourceCount -= 3;
                return undefined;
            }));
        }
        if (options.options.length === 0) {
            return undefined;
        }
        if (options.options.length === 1) {
            return options.options[0];
        }
        return options;
    }
}
exports.RobinHaulings = RobinHaulings;
