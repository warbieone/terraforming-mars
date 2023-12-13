"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Helion = void 0;
const CorporationCard_1 = require("./CorporationCard");
const Tag_1 = require("../../../common/cards/Tag");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class Helion extends CorporationCard_1.CorporationCard {
    constructor() {
        super({
            name: CardName_1.CardName.HELION,
            tags: [Tag_1.Tag.SPACE],
            startingMegaCredits: 40,
            behavior: {
                production: { heat: 4 },
            },
            metadata: {
                cardNumber: 'R18',
                description: 'You start with 4 heat production and 40 M€.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.br;
                    b.production((pb) => pb.heat(4)).nbsp.megacredits(40);
                    b.corpBox('effect', (ce) => {
                        ce.effect('You may use heat as M€. You may not use M€ as heat.', (eb) => {
                            eb.startEffect.text('x').heat(1).equals().megacredits(0, { multiplier: Options_1.multiplier });
                        });
                    });
                }),
            },
        });
    }
    bespokePlay(player) {
        player.canUseHeatAsMegaCredits = true;
        return undefined;
    }
}
exports.Helion = Helion;
//# sourceMappingURL=Helion.js.map