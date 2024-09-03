"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Caesar = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const CeoCard_1 = require("./CeoCard");
const SelectProductionToLoseDeferred_1 = require("../../deferredActions/SelectProductionToLoseDeferred");
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
        player.defer(() => {
            const units = game.board.getHazards().length < 6 ? 1 : 2;
            player.getOpponents().forEach((opponent) => {
                game.defer(new SelectProductionToLoseDeferred_1.SelectProductionToLoseDeferred(opponent, units));
            });
            return undefined;
        });
        return undefined;
    }
}
exports.Caesar = Caesar;
