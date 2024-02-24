"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BufferGasStandardProject = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const StandardProjectCard_1 = require("../StandardProjectCard");
class BufferGasStandardProject extends StandardProjectCard_1.StandardProjectCard {
    constructor() {
        super({
            name: CardName_1.CardName.BUFFER_GAS_STANDARD_PROJECT,
            cost: 16,
            tr: { tr: 1 },
            metadata: {
                cardNumber: 'SP3',
                renderData: CardRenderer_1.CardRenderer.builder((b) => b.standardProject('Spend 16 M€ to increase your TR 1 step. Solo games only.', (eb) => {
                    eb.megacredits(16).startAction.tr(1);
                })),
            },
        });
    }
    actionEssence(player) {
        player.increaseTerraformRating();
    }
}
exports.BufferGasStandardProject = BufferGasStandardProject;
