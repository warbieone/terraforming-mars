"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Manutech = void 0;
const CorporationCard_1 = require("../corporation/CorporationCard");
const Tag_1 = require("../../../common/cards/Tag");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class Manutech extends CorporationCard_1.CorporationCard {
    constructor() {
        super({
            name: CardName_1.CardName.MANUTECH,
            tags: [Tag_1.Tag.BUILDING],
            startingMegaCredits: 35,
            behavior: {
                production: { steel: 1 },
            },
            metadata: {
                cardNumber: 'R23',
                description: 'You start with 1 steel production, and 35 M€.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.br.br;
                    b.production((pb) => pb.steel(1)).nbsp.megacredits(35);
                    b.corpBox('effect', (ce) => {
                        ce.effect('For each step you increase the production of a resource, including this, you also gain that resource.', (eb) => {
                            eb.production((pb) => pb.wild(1)).startEffect.wild(1);
                        });
                    });
                }),
            },
        });
    }
    static onProductionGain(player, resource, amount) {
        if (amount > 0) {
            player.stock.add(resource, amount);
        }
    }
}
exports.Manutech = Manutech;
//# sourceMappingURL=Manutech.js.map