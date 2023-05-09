"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HAL9000 = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const CeoCard_1 = require("./CeoCard");
const Options_1 = require("../Options");
const Units_1 = require("../../../common/Units");
class HAL9000 extends CeoCard_1.CeoCard {
    constructor() {
        super({
            name: CardName_1.CardName.HAL9000,
            metadata: {
                cardNumber: 'L08',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.opgArrow().text('ACTIVATE THE BELOW ABILITY');
                    b.br.br;
                    b.minus().text('EACH').production((pb) => pb.wild(1)).nbsp.colon().wild(4, { digit: Options_1.digit }).asterix();
                    b.br;
                }),
                description: 'Once per game, decrease each of your productions 1 step to gain 4 of that resource.',
            },
        });
    }
    action(player) {
        this.isDisabled = true;
        for (const type of Units_1.Units.keys) {
            const adjustment = Units_1.Units.of({});
            adjustment[type] = -1;
            if (player.production.canAdjust(adjustment)) {
                player.production.adjust(adjustment, { log: true });
                adjustment[type] = 4;
                player.addUnits(adjustment, { log: true });
            }
        }
        return undefined;
    }
}
exports.HAL9000 = HAL9000;
