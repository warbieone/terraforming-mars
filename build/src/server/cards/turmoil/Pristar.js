"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pristar = void 0;
const CardResource_1 = require("../../../common/CardResource");
const CardName_1 = require("../../../common/cards/CardName");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardRenderer_1 = require("../render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
const Turmoil_1 = require("../../turmoil/Turmoil");
class Pristar extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.PRISTAR,
            startingMegaCredits: 53,
            resourceType: CardResource_1.CardResource.PRESERVATION,
            type: CardType_1.CardType.CORPORATION,
            victoryPoints: { resourcesHere: {} },
            metadata: {
                cardNumber: 'R07',
                description: 'You start with 53 M€. Decrease your TR 2 steps. 1 VP per preservation resource here.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.br.br.br;
                    b.megacredits(53).nbsp.nbsp.minus().tr(2, { size: Size_1.Size.SMALL });
                    b.corpBox('effect', (ce) => {
                        ce.effect('During production phase, if you did not get TR so far this generation, add one preservation resource here, gain 6 M€, and 1 influence.', (eb) => {
                            eb.tr(1, { size: Size_1.Size.SMALL, cancelled: true }).startEffect.preservation(1).megacredits(6).influence();
                        });
                    });
                }),
            },
        });
        this.hasReceivedInfluenceBonus = false;
    }
    bespokePlay(player) {
        player.decreaseTerraformRatingSteps(2);
        return undefined;
    }
    onProductionPhase(player) {
        if (!(player.hasIncreasedTerraformRatingThisGeneration)) {
            player.megaCredits += 6;
            player.addResourceTo(this, 1);
            if (!this.hasReceivedInfluenceBonus) {
                Turmoil_1.Turmoil.ifTurmoil(player.game, (turmoil) => {
                    turmoil.addInfluenceBonus(player);
                });
                this.hasReceivedInfluenceBonus = true;
            }
        }
        else {
            this.hasReceivedInfluenceBonus = false;
            Turmoil_1.Turmoil.ifTurmoil(player.game, (turmoil) => {
                turmoil.addInfluenceBonus(player, -1);
            });
        }
        return undefined;
    }
}
exports.Pristar = Pristar;
//# sourceMappingURL=Pristar.js.map