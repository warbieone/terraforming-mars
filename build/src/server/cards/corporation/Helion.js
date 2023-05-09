"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Helion = void 0;
const Card_1 = require("../Card");
const Tag_1 = require("../../../common/cards/Tag");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class Helion extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.CORPORATION,
            name: CardName_1.CardName.HELION,
            tags: [Tag_1.Tag.SPACE],
            startingMegaCredits: 42,
            behavior: {
                production: { heat: 3 },
            },
            metadata: {
                cardNumber: 'R18',
                description: 'You start with 3 heat production and 42 M€.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.br;
                    b.production((pb) => pb.heat(3)).nbsp.megacredits(42);
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
