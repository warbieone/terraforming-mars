"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitedNationsMarsInitiative = exports.ACTION_COST = void 0;
const CorporationCard_1 = require("./CorporationCard");
const Tag_1 = require("../../../common/cards/Tag");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const SelectPaymentDeferred_1 = require("../../deferredActions/SelectPaymentDeferred");
const titles_1 = require("../../inputs/titles");
exports.ACTION_COST = 1;
class UnitedNationsMarsInitiative extends CorporationCard_1.CorporationCard {
    constructor() {
        super({
            name: CardName_1.CardName.UNITED_NATIONS_MARS_INITIATIVE,
            tags: [Tag_1.Tag.EARTH],
            startingMegaCredits: 50,
            metadata: {
                cardNumber: 'R32',
                description: 'You start with 50 M€.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.br.br.br;
                    b.empty().nbsp.nbsp.nbsp.nbsp.megacredits(40);
                    b.corpBox('action', (ce) => {
                        ce.action('If your Terraform Rating was raised this generation, you may pay 1 M€ to raise it 1 step more.', (eb) => {
                            eb.megacredits(1).startAction.tr(1).asterix();
                        });
                    });
                }),
            },
        });
    }
    canAct(player) {
        return player.hasIncreasedTerraformRatingThisGeneration && player.canAfford({ cost: exports.ACTION_COST, tr: { tr: 1 } });
    }
    action(player) {
        player.game.defer(new SelectPaymentDeferred_1.SelectPaymentDeferred(player, 1, { title: titles_1.TITLES.payForCardAction(this.name) }))
            .andThen(() => player.increaseTerraformRating());
        return undefined;
    }
}
exports.UnitedNationsMarsInitiative = UnitedNationsMarsInitiative;
