"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CityStandardProject = void 0;
const CardName_1 = require("../../../../common/cards/CardName");
const CardRenderer_1 = require("../../render/CardRenderer");
const StandardProjectCard_1 = require("../../StandardProjectCard");
const PlaceCityTile_1 = require("../../../deferredActions/PlaceCityTile");
const Resource_1 = require("../../../../common/Resource");
class CityStandardProject extends StandardProjectCard_1.StandardProjectCard {
    constructor() {
        super({
            name: CardName_1.CardName.CITY_STANDARD_PROJECT,
            cost: 25,
            metadata: {
                cardNumber: 'SP4',
                renderData: CardRenderer_1.CardRenderer.builder((b) => b.standardProject('Spend 25 M€ to place a city tile and increase your M€ production 1 step.', (eb) => {
                    eb.megacredits(25).startAction.city().production((pb) => {
                        pb.megacredits(1);
                    });
                })),
            },
        });
    }
    discount(player) {
        if (player.getPlayedCard(CardName_1.CardName.PREFABRICATION_OF_HUMAN_HABITATS)) {
            return 2 + super.discount(player);
        }
        return super.discount(player);
    }
    canPayWith(player) {
        if (player.getPlayedCard(CardName_1.CardName.PREFABRICATION_OF_HUMAN_HABITATS)) {
            return { steel: true };
        }
        else {
            return {};
        }
    }
    canAct(player) {
        if (player.game.board.getAvailableSpacesForCity(player, this.canPlayOptions(player)).length === 0) {
            return false;
        }
        return super.canAct(player);
    }
    actionEssence(player) {
        player.game.defer(new PlaceCityTile_1.PlaceCityTile(player));
        player.production.add(Resource_1.Resource.MEGACREDITS, 1);
    }
}
exports.CityStandardProject = CityStandardProject;
