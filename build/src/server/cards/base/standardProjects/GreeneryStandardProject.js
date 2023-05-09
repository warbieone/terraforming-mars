"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GreeneryStandardProject = void 0;
const CardName_1 = require("../../../../common/cards/CardName");
const CardRenderer_1 = require("../../render/CardRenderer");
const StandardProjectCard_1 = require("../../StandardProjectCard");
const PlaceGreeneryTile_1 = require("../../../deferredActions/PlaceGreeneryTile");
class GreeneryStandardProject extends StandardProjectCard_1.StandardProjectCard {
    constructor() {
        super({
            name: CardName_1.CardName.GREENERY_STANDARD_PROJECT,
            cost: 23,
            tr: { oxygen: 1 },
            metadata: {
                cardNumber: 'SP6',
                renderData: CardRenderer_1.CardRenderer.builder((b) => b.standardProject('Spend 23 M€ to place a greenery tile and raise oxygen 1 step.', (eb) => {
                    eb.megacredits(23).startAction.greenery();
                })),
            },
        });
    }
    canPayWith(player) {
        if (player.isCorporation(CardName_1.CardName.SOYLENT_SEEDLING_SYSTEMS)) {
            return { seeds: true };
        }
        else {
            return {};
        }
    }
    canAct(player) {
        if (player.game.board.getAvailableSpacesForGreenery(player).length === 0)
            return false;
        return super.canAct(player);
    }
    actionEssence(player) {
        player.game.defer(new PlaceGreeneryTile_1.PlaceGreeneryTile(player));
    }
}
exports.GreeneryStandardProject = GreeneryStandardProject;
