"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButterflyEffect = void 0;
const Card_1 = require("../Card");
const CardName_1 = require("../../../common/cards/CardName");
const ShiftAresGlobalParametersDeferred_1 = require("../../deferredActions/ShiftAresGlobalParametersDeferred");
const CardType_1 = require("../../../common/cards/CardType");
const CardRenderer_1 = require("../render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
const AresHandler_1 = require("../../../server/ares/AresHandler");
const AresData_1 = require("../../../common/ares/AresData");
class ButterflyEffect extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.EVENT,
            name: CardName_1.CardName.BUTTERFLY_EFFECT,
            cost: 8,
            behavior: {
                tr: 1,
            },
            metadata: {
                cardNumber: 'A03',
                description: 'Gain 1 TR. Move each hazard marker up to 1 step up or down along its terraforming track.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.tr(1).br;
                    b.plate('All hazard markers').colon().text('-1 / 0 / +1', Size_1.Size.SMALL);
                }),
            },
        });
    }
    bespokePlay(player) {
        AresHandler_1.AresHandler.ifAres(player.game, (aresData) => {
            const hazardData = aresData.hazardData;
            if (AresData_1.HAZARD_CONSTRAINTS.some((constraint) => hazardData[constraint].available === true)) {
                player.game.defer(new ShiftAresGlobalParametersDeferred_1.ShiftAresGlobalParametersDeferred(player));
            }
            else {
                player.game.log('All global parameters are high enough that there is no point in changing any of them.');
            }
        });
        return undefined;
    }
}
exports.ButterflyEffect = ButterflyEffect;
