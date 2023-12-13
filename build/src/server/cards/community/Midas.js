"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Midas = void 0;
const CorporationCard_1 = require("../corporation/CorporationCard");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
class Midas extends CorporationCard_1.CorporationCard {
    constructor() {
        super({
            name: CardName_1.CardName.MIDAS,
            startingMegaCredits: 120,
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
        player.decreaseTerraformRating(7);
        return undefined;
    }
}
exports.Midas = Midas;
//# sourceMappingURL=Midas.js.map