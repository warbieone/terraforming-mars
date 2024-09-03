"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HydrogenBombardment = void 0;
const PreludeCard_1 = require("../prelude/PreludeCard");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Tag_1 = require("../../../common/cards/Tag");
class HydrogenBombardment extends PreludeCard_1.PreludeCard {
    constructor() {
        super({
            name: CardName_1.CardName.HYDROGEN_BOMBARDMENT,
            tags: [Tag_1.Tag.SPACE, Tag_1.Tag.VENUS],
            behavior: {
                production: { titanium: 1 },
                global: { venus: 1 },
                stock: { megacredits: 6 },
            },
            metadata: {
                cardNumber: 'PfP04',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.venus(1).br;
                    b.production((pb) => pb.titanium(1)).br;
                    b.megacredits(6);
                }),
                description: 'Increase the Venus scale 1 step. Increase your titanium production 1 step. Gain 6 M€.',
            },
        });
    }
}
exports.HydrogenBombardment = HydrogenBombardment;
