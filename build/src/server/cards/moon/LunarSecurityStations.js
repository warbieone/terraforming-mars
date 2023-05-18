"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LunarSecurityStations = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
const Size_1 = require("../../../common/cards/render/Size");
const CardRequirements_1 = require("../requirements/CardRequirements");
const Options_1 = require("../Options");
class LunarSecurityStations extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.LUNAR_SECURITY_STATIONS,
            type: CardType_1.CardType.ACTIVE,
            cost: 9,
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.roadTiles(3, { all: Options_1.all })),
            behavior: {
                moon: { logisticsRate: 1 },
            },
            metadata: {
                description: 'Requires 3 road tiles on The Moon. Raise the logistic rate 1 step.',
                cardNumber: 'M42',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.text('Opponents may not remove your', Size_1.Size.SMALL, true).br;
                    b.steel(1).titanium(1).production((pb) => pb.steel(1).titanium(1)).br;
                    b.moonLogisticsRate();
                }),
            },
        });
    }
}
exports.LunarSecurityStations = LunarSecurityStations;
//# sourceMappingURL=LunarSecurityStations.js.map