"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrediCor = void 0;
const CorporationCard_1 = require("./CorporationCard");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Resource_1 = require("../../../common/Resource");
class CrediCor extends CorporationCard_1.CorporationCard {
    constructor() {
        super({
            name: CardName_1.CardName.CREDICOR,
            startingMegaCredits: 57,
            metadata: {
                cardNumber: 'R08',
                description: 'You start with 57 M€.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.br.br.br;
                    b.megacredits(57);
                    b.corpBox('effect', (ce) => {
                        ce.effect('After you pay for a card or standard project with a basic cost of 20M€ or more, you gain 4 M€.', (eb) => {
                            eb.minus().megacredits(20).startEffect.megacredits(4);
                        });
                    });
                }),
            },
        });
    }
    effect(player, card) {
        if (player.isCorporation(this.name) && card.cost >= 20) {
            player.stock.add(Resource_1.Resource.MEGACREDITS, 4, { log: true });
        }
    }
    onCardPlayed(player, card) {
        this.effect(player, card);
    }
    onStandardProject(player, project) {
        this.effect(player, project);
    }
}
exports.CrediCor = CrediCor;
//# sourceMappingURL=CrediCor.js.map