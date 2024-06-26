"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gaia = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const CeoCard_1 = require("./CeoCard");
const SpaceType_1 = require("../../../common/boards/SpaceType");
const AresHandler_1 = require("../../ares/AresHandler");
const AresTileType_1 = require("../../../common/AresTileType");
class Gaia extends CeoCard_1.CeoCard {
    constructor() {
        super({
            name: CardName_1.CardName.GAIA,
            metadata: {
                cardNumber: 'L32',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.opgArrow().colon().adjacencyBonus().asterix();
                    b.br;
                }),
                description: 'Once per game, gain the Ares adjacency bonuses of all player-owned tiles on Mars.',
            },
        });
    }
    action(player) {
        this.isDisabled = true;
        const board = player.game.board;
        const tilesOnMars = board.spaces.filter((space) => space.tile?.tileType !== undefined && space.player !== undefined && !(0, AresTileType_1.isHazardTileType)(space.tile.tileType) && space.spaceType !== SpaceType_1.SpaceType.COLONY);
        tilesOnMars.forEach((space) => {
            AresHandler_1.AresHandler.ifAres(player.game, () => {
                AresHandler_1.AresHandler.earnAdjacencyBonuses(player, space, { giveAresTileOwnerBonus: false });
            });
        });
        return undefined;
    }
}
exports.Gaia = Gaia;
