"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Flooding = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const SelectPlayer_1 = require("../../inputs/SelectPlayer");
const OrOptions_1 = require("../../inputs/OrOptions");
const SelectOption_1 = require("../../inputs/SelectOption");
const SelectSpace_1 = require("../../inputs/SelectSpace");
const CardName_1 = require("../../../common/cards/CardName");
const Resource_1 = require("../../../common/Resource");
const PlaceOceanTile_1 = require("../../deferredActions/PlaceOceanTile");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class Flooding extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.EVENT,
            name: CardName_1.CardName.FLOODING,
            cost: 7,
            tr: { oceans: 1 },
            victoryPoints: -1,
            metadata: {
                cardNumber: '188',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.oceans(1).nbsp.minus().megacredits(4, { all: Options_1.all }).asterix();
                }),
                description: 'Place an ocean tile. IF THERE ARE TILES ADJACENT TO THIS OCEAN TILE, YOU MAY REMOVE 4 M€ FROM THE OWNER OF ONE OF THOSE TILES.',
            },
        });
    }
    bespokePlay(player) {
        if (player.game.isSoloMode()) {
            player.game.defer(new PlaceOceanTile_1.PlaceOceanTile(player));
            return undefined;
        }
        if (!player.game.canAddOcean())
            return undefined;
        return new SelectSpace_1.SelectSpace('Select space for ocean tile', player.game.board.getAvailableSpacesForOcean(player), (space) => {
            player.game.addOcean(player, space);
            const adjacentPlayers = new Set();
            player.game.board.getAdjacentSpaces(space).forEach((space) => {
                if (space.player && space.player !== player && space.tile) {
                    adjacentPlayers.add(space.player);
                }
            });
            if (adjacentPlayers.size > 0) {
                return new OrOptions_1.OrOptions(new SelectPlayer_1.SelectPlayer(Array.from(adjacentPlayers), 'Select adjacent player to remove 4 M€ from', 'Remove credits', (selectedPlayer) => {
                    selectedPlayer.deductResource(Resource_1.Resource.MEGACREDITS, 4, { log: true, from: player });
                    return undefined;
                }), new SelectOption_1.SelectOption('Don\'t remove M€ from adjacent player', 'Confirm', () => {
                    return undefined;
                }));
            }
            return undefined;
        });
    }
}
exports.Flooding = Flooding;
//# sourceMappingURL=Flooding.js.map