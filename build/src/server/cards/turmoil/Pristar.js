"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pristar = void 0;
const CorporationCard_1 = require("../corporation/CorporationCard");
const CardResource_1 = require("../../../common/CardResource");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
const Turmoil_1 = require("../../../server/turmoil/Turmoil");
const Resource_1 = require("../../../common/Resource");
class Pristar extends CorporationCard_1.CorporationCard {
    constructor() {
        super({
            name: CardName_1.CardName.PRISTAR,
            startingMegaCredits: 53,
            resourceType: CardResource_1.CardResource.PRESERVATION,
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
        player.decreaseTerraformRating(2);
        return undefined;
    }
    onProductionPhase(player) {
        if (!(player.hasIncreasedTerraformRatingThisGeneration)) {
            player.stock.add(Resource_1.Resource.MEGACREDITS, 6, { log: true, from: this });
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