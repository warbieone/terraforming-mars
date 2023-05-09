"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Caesar = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const CeoCard_1 = require("./CeoCard");
const SelectProductionToLoseDeferred_1 = require("../../deferredActions/SelectProductionToLoseDeferred");
const DeferredAction_1 = require("../../deferredActions/DeferredAction");
const PlaceHazardTile_1 = require("../../deferredActions/PlaceHazardTile");
const TileType_1 = require("../../../common/TileType");
const Size_1 = require("../../../common/cards/render/Size");
const Options_1 = require("../Options");
class Caesar extends CeoCard_1.CeoCard {
    constructor() {
        super({
            name: CardName_1.CardName.CAESAR,
            metadata: {
                cardNumber: 'L33',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.opgArrow().text('X').hazardTile(1, { size: Size_1.Size.LARGE }).br;
                    b.minus().production((pb) => pb.wild(1, { all: Options_1.all })).asterix();
                    b.br;
                }),
                description: 'Once per game, place X hazard tiles where X is the current generation number. Each opponent loses 1 unit of production of their choice, or 2 units if there are 6 or more hazard tiles.',
            },
        });
    }
    canAct(player) {
        if (!super.canAct(player)) {
            return false;
        }
        return player.game.board.getAvailableSpacesOnLand(player).length >= player.game.generation;
    }
    action(player) {
        this.isDisabled = true;
        const game = player.game;
        for (let i = 0; i < game.generation; i++) {
            game.defer(new PlaceHazardTile_1.PlaceHazardTile(player, TileType_1.TileType.EROSION_MILD));
        }
        const otherPlayers = game.getPlayers().filter((p) => p.id !== player.id);
        game.defer(new DeferredAction_1.SimpleDeferredAction(player, () => {
            const hazardTileCount = game.board.spaces.filter((space) => space.tile && TileType_1.HAZARD_TILES.has(space.tile.tileType)).length;
            otherPlayers.forEach((opponent) => {
                const units = hazardTileCount < 6 ? 1 : 2;
                game.defer(new SelectProductionToLoseDeferred_1.SelectProductionToLoseDeferred(opponent, units));
            });
            return undefined;
        }));
        return undefined;
    }
}
exports.Caesar = Caesar;
