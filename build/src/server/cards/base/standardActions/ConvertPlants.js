"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConvertPlants = void 0;
const StandardActionCard_1 = require("../../StandardActionCard");
const CardName_1 = require("../../../../common/cards/CardName");
const CardRenderer_1 = require("../../render/CardRenderer");
const constants_1 = require("../../../../common/constants");
const SelectSpace_1 = require("../../../inputs/SelectSpace");
const Units_1 = require("../../../../common/Units");
class ConvertPlants extends StandardActionCard_1.StandardActionCard {
    constructor() {
        super({
            name: CardName_1.CardName.CONVERT_PLANTS,
            metadata: {
                cardNumber: 'SA2',
                renderData: CardRenderer_1.CardRenderer.builder((b) => b.standardProject('Spend 8 plants to place a greenery tile and raise oxygen 1 step.', (eb) => {
                    eb.plants(8).startAction.greenery();
                })),
            },
        });
    }
    canAct(player) {
        if (player.plants < player.plantsNeededForGreenery) {
            return false;
        }
        if (player.game.board.getAvailableSpacesForGreenery(player).length === 0) {
            return false;
        }
        if (player.game.getOxygenLevel() === constants_1.MAX_OXYGEN_LEVEL) {
            return true;
        }
        return player.canAfford(0, {
            tr: { oxygen: 1 },
            reserveUnits: Units_1.Units.of({ plants: player.plantsNeededForGreenery }),
        });
    }
    action(player) {
        return new SelectSpace_1.SelectSpace(`Convert ${player.plantsNeededForGreenery} plants into greenery`, player.game.board.getAvailableSpacesForGreenery(player), (space) => {
            this.actionUsed(player);
            player.game.addGreenery(player, space);
            player.plants -= player.plantsNeededForGreenery;
            return undefined;
        });
    }
}
exports.ConvertPlants = ConvertPlants;
