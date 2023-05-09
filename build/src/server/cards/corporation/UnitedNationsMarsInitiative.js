"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitedNationsMarsInitiative = exports.ACTION_COST = void 0;
const Card_1 = require("../Card");
const Tag_1 = require("../../../common/cards/Tag");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const CardRenderer_1 = require("../render/CardRenderer");
exports.ACTION_COST = 3;
class UnitedNationsMarsInitiative extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.CORPORATION,
            name: CardName_1.CardName.UNITED_NATIONS_MARS_INITIATIVE,
            tags: [Tag_1.Tag.EARTH],
            startingMegaCredits: 40,
            metadata: {
                cardNumber: 'R32',
                description: 'You start with 40 M€.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.br.br.br;
                    b.empty().nbsp.nbsp.nbsp.nbsp.megacredits(40);
                    b.corpBox('action', (ce) => {
                        ce.action('If your Terraform Rating was raised this generation, you may pay 3 M€ to raise it 1 step more.', (eb) => {
                            eb.megacredits(3).startAction.tr(1).asterix();
                        });
                    });
                }),
            },
        });
    }
    canAct(player) {
        return player.hasIncreasedTerraformRatingThisGeneration && player.canAfford(exports.ACTION_COST, { tr: { tr: 1 } });
    }
    action(player) {
        player.payMegacreditsDeferred(3, 'Select how to pay for UNMI action.', () => player.increaseTerraformRating());
        return undefined;
    }
}
exports.UnitedNationsMarsInitiative = UnitedNationsMarsInitiative;
