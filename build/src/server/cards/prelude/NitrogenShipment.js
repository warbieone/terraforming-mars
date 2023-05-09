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
                production: { plants: 1 },
                tr: 1,
                stock: { megacredits: 5 },
            },
            metadata: {
                cardNumber: 'P24',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.plants(1)).tr(1).br;
                    b.megacredits(5);
                }),
                description: 'Increase your plant production 1 step. Increase your TR 1 step. Gain 5 M€.',
            },
        });
    }
}
exports.NitrogenShipment = NitrogenShipment;
