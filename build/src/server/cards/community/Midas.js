"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Midas = void 0;
const Card_1 = require("../Card");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const CardRenderer_1 = require("../render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
class Midas extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.MIDAS,
            startingMegaCredits: 120,
            type: CardType_1.CardType.CORPORATION,
            metadata: {
                cardNumber: 'R41',
                description: 'You start with 120 M€. Lower your TR 7 steps.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.vSpace(Size_1.Size.LARGE).br;
                    b.megacredits(120, { size: Size_1.Size.LARGE }).nbsp.nbsp.nbsp;
                    b.minus().tr(7);
                }),
            },
        });
    }
    bespokePlay(player) {
        player.decreaseTerraformRatingSteps(7);
        return undefined;
    }
}
exports.Midas = Midas;
