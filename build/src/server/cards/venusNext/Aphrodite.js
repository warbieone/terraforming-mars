"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aphrodite = void 0;
const CorporationCard_1 = require("../corporation/CorporationCard");
const Tag_1 = require("../../../common/cards/Tag");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class Aphrodite extends CorporationCard_1.CorporationCard {
    constructor() {
        super({
            name: CardName_1.CardName.APHRODITE,
            tags: [Tag_1.Tag.PLANT, Tag_1.Tag.VENUS],
            startingMegaCredits: 50,
            behavior: {
                production: { plants: 2 },
            },
            metadata: {
                cardNumber: 'R01',
                description: 'You start with 2 plant production and 50 M€.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.br;
                    b.production((pb) => pb.plants(2)).nbsp.megacredits(50);
                    b.corpBox('effect', (ce) => {
                        ce.effect('Whenever Venus is terraformed 1 step, you gain 3 M€ and the player (not WGT) who raised it gain 2 M€.', (eb) => {
                            eb.venus(1, { all: Options_1.all }).startEffect;
                            eb.megacredits(2).asterix().nbsp.megacredits(3);
                        });
                    });
                }),
            },
        });
    }
}
exports.Aphrodite = Aphrodite;
//# sourceMappingURL=Aphrodite.js.map