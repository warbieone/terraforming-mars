"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FloaterLeasing = void 0;
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const Resource_1 = require("../../../common/Resource");
const CardResource_1 = require("../../../common/CardResource");
const Card_1 = require("../Card");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class FloaterLeasing extends Card_1.Card {
    constructor() {
        super({
            cost: 3,
            name: CardName_1.CardName.FLOATER_LEASING,
            type: CardType_1.CardType.AUTOMATED,
            metadata: {
                cardNumber: 'C10',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.megacredits(1)).slash().floaters(3, { digit: Options_1.digit });
                }),
                description: 'Increase your M€ production 1 step PER 3 floaters you have.',
            },
        });
    }
    bespokePlay(player) {
        player.production.add(Resource_1.Resource.MEGACREDITS, Math.floor(player.getResourceCount(CardResource_1.CardResource.FLOATER) / 3), { log: true });
        return undefined;
    }
}
exports.FloaterLeasing = FloaterLeasing;
