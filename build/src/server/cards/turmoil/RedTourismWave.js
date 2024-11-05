"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedTourismWave = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const PartyName_1 = require("../../../common/turmoil/PartyName");
const Resource_1 = require("../../../common/Resource");
const CardRenderer_1 = require("../render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
const Card_1 = require("../Card");
const AresTileType_1 = require("../../../common/AresTileType");
const SpaceType_1 = require("../../../common/boards/SpaceType");
class RedTourismWave extends Card_1.Card {
    constructor() {
        super({
            cost: 3,
            tags: [Tag_1.Tag.EARTH],
            name: CardName_1.CardName.RED_TOURISM_WAVE,
            type: CardType_1.CardType.EVENT,
            requirements: { party: PartyName_1.PartyName.REDS },
            metadata: {
                cardNumber: 'T12',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.megacredits(1).slash().emptyTile('normal', { size: Size_1.Size.SMALL }).asterix();
                }),
                description: 'Requires that Reds are ruling or that you have 2 delegates there. Gain 1 M€ from each EMPTY AREA ADJACENT TO YOUR TILES',
            },
        });
    }
    bespokePlay(player) {
        const amount = RedTourismWave.getAdjacentEmptySpacesCount(player);
        player.stock.add(Resource_1.Resource.MEGACREDITS, amount, { log: true });
        return undefined;
    }
    static hasRealTile(space) {
        return space.tile !== undefined && !(0, AresTileType_1.isHazardTileType)(space.tile.tileType);
    }
    static getAdjacentEmptySpacesCount(player) {
        const board = player.game.board;
        return board.spaces.filter((space) => {
            if (space.spaceType === SpaceType_1.SpaceType.COLONY) {
                return false;
            }
            if (space.spaceType === SpaceType_1.SpaceType.RESTRICTED) {
                return false;
            }
            if (this.hasRealTile(space)) {
                return false;
            }
            return board.getAdjacentSpaces(space).some((adj) => {
                return this.hasRealTile(adj) && adj.player === player;
            });
        }).length;
    }
}
exports.RedTourismWave = RedTourismWave;
