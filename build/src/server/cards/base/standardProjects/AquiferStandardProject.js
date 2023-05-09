"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AquiferStandardProject = void 0;
const CardName_1 = require("../../../../common/cards/CardName");
const CardRenderer_1 = require("../../render/CardRenderer");
const PlaceOceanTile_1 = require("../../../deferredActions/PlaceOceanTile");
const StandardProjectCard_1 = require("../../StandardProjectCard");
class AquiferStandardProject extends StandardProjectCard_1.StandardProjectCard {
    constructor() {
        super({
            name: CardName_1.CardName.AQUIFER_STANDARD_PROJECT,
            cost: 18,
            tr: { oceans: 1 },
            metadata: {
                cardNumber: 'SP2',
                renderData: CardRenderer_1.CardRenderer.builder((b) => b.standardProject('Spend 18 M€ to place an ocean tile.', (eb) => {
                    eb.megacredits(18).startAction.oceans(1);
                })),
            },
        });
    }
    canAct(player) {
        if (!player.game.canAddOcean())
            return false;
        return super.canAct(player);
    }
    actionEssence(player) {
        player.game.defer(new PlaceOceanTile_1.PlaceOceanTile(player));
    }
}
exports.AquiferStandardProject = AquiferStandardProject;
