"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DesperateMeasures = void 0;
const Card_1 = require("../Card");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const SelectSpace_1 = require("../../inputs/SelectSpace");
const TileType_1 = require("../../../common/TileType");
const AresHandler_1 = require("../../ares/AresHandler");
const CardRenderer_1 = require("../render/CardRenderer");
class DesperateMeasures extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.EVENT,
            name: CardName_1.CardName.DESPERATE_MEASURES,
            cost: 1,
            victoryPoints: -2,
            metadata: {
                cardNumber: 'A04',
                description: 'Place a bronze cube on a dust storm tile and raise oxygen 1 step, or place a bronze cube on an erosion tile and raise the temperature 1 step. The hazard tile with the bronze cube cannot be removed.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.resourceCube().asterix().br;
                    b.temperature(1).slash().oxygen(1);
                }),
            },
        });
    }
    getHazardTiles(game) {
        return game.board.spaces.filter((space) => AresHandler_1.AresHandler.hasHazardTile(space));
    }
    bespokeCanPlay(player) {
        return this.getHazardTiles(player.game).length > 0;
    }
    bespokePlay(player) {
        return new SelectSpace_1.SelectSpace('Select a hazard space to protect', this.getHazardTiles(player.game), (space) => {
            if (space.tile === undefined) {
                throw new Error(`selected space ${space.id} without tile for DesperateMeasures`);
            }
            space.tile.protectedHazard = true;
            const tileType = space.tile.tileType;
            if (TileType_1.TileType.DUST_STORM_MILD === tileType || TileType_1.TileType.DUST_STORM_SEVERE === tileType) {
                player.game.increaseOxygenLevel(player, 1);
            }
            else {
                player.game.increaseTemperature(player, 1);
            }
            return undefined;
        });
    }
}
exports.DesperateMeasures = DesperateMeasures;
