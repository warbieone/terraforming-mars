"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SulphurEatingBacteria = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardResource_1 = require("../../../common/CardResource");
const OrOptions_1 = require("../../inputs/OrOptions");
const SelectOption_1 = require("../../inputs/SelectOption");
const SelectAmount_1 = require("../../inputs/SelectAmount");
const CardName_1 = require("../../../common/cards/CardName");
const CardRequirements_1 = require("../requirements/CardRequirements");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
const Options_1 = require("../Options");
class SulphurEatingBacteria extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.SULPHUR_EATING_BACTERIA,
            type: CardType_1.CardType.ACTIVE,
            tags: [Tag_1.Tag.VENUS, Tag_1.Tag.MICROBE],
            cost: 6,
            resourceType: CardResource_1.CardResource.MICROBE,
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.venus(6)),
            metadata: {
                cardNumber: '251',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Add 1 microbe to this card.', (eb) => {
                        eb.empty().startAction.microbes(1);
                    }).br;
                    b.or().br;
                    b.action('Spend any number of microbes here to gain triple amount of M€.', (eb) => {
                        eb.text('x').microbes(1).startAction.megacredits(3, { multiplier: Options_1.multiplier });
                    });
                }),
                description: 'Requires Venus 6%',
            },
        });
    }
    canAct() {
        return true;
    }
    action(player) {
        const opts = [];
        const addResource = new SelectOption_1.SelectOption('Add 1 microbe to this card', 'Add microbe', () => {
            player.addResourceTo(this, { log: true });
            return undefined;
        });
        const spendResource = new SelectAmount_1.SelectAmount('Remove any number of microbes to gain 3 M€ per microbe removed', 'Remove microbes', (amount) => this.spendResource(player, amount), 1, this.resourceCount, true);
        opts.push(addResource);
        if (this.resourceCount > 0) {
            opts.push(spendResource);
        }
        else {
            player.addResourceTo(this, { log: true });
            return undefined;
        }
        return new OrOptions_1.OrOptions(...opts);
    }
    spendResource(player, amount) {
        player.removeResourceFrom(this, amount, { log: false });
        const megaCreditsGained = 3 * amount;
        player.megaCredits += megaCreditsGained;
        player.game.log('${0} removed ${1} microbes from ${2} to gain ${3} M€', (b) => b.player(player).number(amount).card(this).number(megaCreditsGained));
        return undefined;
    }
}
exports.SulphurEatingBacteria = SulphurEatingBacteria;
//# sourceMappingURL=SulphurEatingBacteria.js.map