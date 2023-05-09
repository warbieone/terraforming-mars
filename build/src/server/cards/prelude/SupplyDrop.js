"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplyDrop = void 0;
const PreludeCard_1 = require("./PreludeCard");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class SupplyDrop extends PreludeCard_1.PreludeCard {
    constructor() {
        super({
            name: CardName_1.CardName.SUPPLY_DROP,
            behavior: {
                stock: { titanium: 3, steel: 8, plants: 3 },
            },
            metadata: {
                cardNumber: 'P33',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.titanium(3, { digit: Options_1.digit }).steel(8, { digit: Options_1.digit }).plants(3, { digit: Options_1.digit });
                }),
                description: 'Gain 3 titanium, 8 steel and 3 plants.',
            },
        });
    }
}
exports.SupplyDrop = SupplyDrop;
