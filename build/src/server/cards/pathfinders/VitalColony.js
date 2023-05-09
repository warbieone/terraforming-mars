"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VitalColony = void 0;
const PreludeCard_1 = require("../prelude/PreludeCard");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Tag_1 = require("../../../common/cards/Tag");
const BuildColony_1 = require("../../deferredActions/BuildColony");
class VitalColony extends PreludeCard_1.PreludeCard {
    constructor() {
        super({
            name: CardName_1.CardName.VITAL_COLONY,
            tags: [Tag_1.Tag.MARS, Tag_1.Tag.SPACE],
            metadata: {
                cardNumber: 'P08',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.colonies().text('2x bonus');
                }),
                description: 'Place a colony. Receive the placement bonus twice.',
            },
        });
    }
    bespokePlay(player) {
        player.game.defer(new BuildColony_1.BuildColony(player, { giveBonusTwice: true }));
        return undefined;
    }
}
exports.VitalColony = VitalColony;
