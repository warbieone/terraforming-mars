"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AerospaceMission = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const PreludeCard_1 = require("../prelude/PreludeCard");
const CardName_1 = require("../../../common/cards/CardName");
const BuildColony_1 = require("../../deferredActions/BuildColony");
const CardRenderer_1 = require("../render/CardRenderer");
const Resource_1 = require("../../../common/Resource");
class AerospaceMission extends PreludeCard_1.PreludeCard {
    constructor() {
        super({
            name: CardName_1.CardName.AEROSPACE_MISSION,
            tags: [Tag_1.Tag.SPACE],
            startingMegacredits: -14,
            metadata: {
                cardNumber: 'Y01',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.colonies(1).nbsp.colonies(1).br;
                    b.minus().megacredits(14);
                }),
                description: 'Place 2 colonies. Pay 14 M€.',
            },
        });
    }
    bespokeCanPlay(player) {
        return player.canAfford(14);
    }
    bespokePlay(player) {
        player.deductResource(Resource_1.Resource.MEGACREDITS, 14);
        player.game.defer(new BuildColony_1.BuildColony(player, { title: 'Select where to build the first colony' }));
        player.game.defer(new BuildColony_1.BuildColony(player, { title: 'Select where to build the second colony' }));
        return undefined;
    }
}
exports.AerospaceMission = AerospaceMission;
