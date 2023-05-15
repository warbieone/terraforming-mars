"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NitrogenShipment = void 0;
const PreludeCard_1 = require("./PreludeCard");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class NitrogenShipment extends PreludeCard_1.PreludeCard {
    constructor() {
        super({
            name: CardName_1.CardName.NITROGEN_SHIPMENT,
            behavior: {
                tr: 2,
                stock: { plants: 5 },
            },
            metadata: {
                cardNumber: 'P24',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.tr(2).br;
                    b.plants(5);
                }),
                description: 'Increase your TR 2 step. Gain 5 plants.',
            },
        });
    }
}
exports.NitrogenShipment = NitrogenShipment;
//# sourceMappingURL=NitrogenShipment.js.map