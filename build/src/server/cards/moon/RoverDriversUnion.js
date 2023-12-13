"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoverDriversUnion = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardRenderer_1 = require("../render/CardRenderer");
const MoonExpansion_1 = require("../../moon/MoonExpansion");
const Resource_1 = require("../../../common/Resource");
const Card_1 = require("../Card");
class RoverDriversUnion extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.ROVER_DRIVERS_UNION,
            type: CardType_1.CardType.AUTOMATED,
            tags: [Tag_1.Tag.MOON],
            cost: 16,
            requirements: { logisticRate: 2 },
            tr: { moonLogistics: 1 },
            metadata: {
                description: 'Requires 2 logistic rate. Raise the logistic rate 1 step. Increase your M€ production 1 step per logistic rate.',
                cardNumber: 'M78',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.moonLogisticsRate().br;
                    b.production((pb) => pb.megacredits(1)).slash().moonLogisticsRate();
                }),
            },
        });
    }
    bespokePlay(player) {
        MoonExpansion_1.MoonExpansion.ifMoon(player.game, (moonData) => {
            MoonExpansion_1.MoonExpansion.raiseLogisticRate(player);
            player.production.add(Resource_1.Resource.MEGACREDITS, moonData.logisticRate, { log: true });
        });
        return undefined;
    }
}
exports.RoverDriversUnion = RoverDriversUnion;
//# sourceMappingURL=RoverDriversUnion.js.map