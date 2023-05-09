"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StrategicBasePlanning = void 0;
const PreludeCard_1 = require("../prelude/PreludeCard");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Resource_1 = require("../../../common/Resource");
const Tag_1 = require("../../../common/cards/Tag");
class StrategicBasePlanning extends PreludeCard_1.PreludeCard {
    constructor() {
        super({
            name: CardName_1.CardName.STRATEGIC_BASE_PLANNING,
            tags: [Tag_1.Tag.BUILDING],
            startingMegacredits: -8,
            behavior: {
                colonies: { buildColony: {} },
                city: {},
            },
            metadata: {
                cardNumber: 'P08',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.minus().megacredits(8).city().colonies();
                }),
                description: 'Pay 8M€. Place a city. Place a colony.',
            },
        });
    }
    bespokePlay(player) {
        player.deductResource(Resource_1.Resource.MEGACREDITS, 8);
        return undefined;
    }
}
exports.StrategicBasePlanning = StrategicBasePlanning;
