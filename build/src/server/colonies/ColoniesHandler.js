"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColoniesHandler = void 0;
const ColonyName_1 = require("../../common/colonies/ColonyName");
const Tag_1 = require("../../common/cards/Tag");
const SelectColony_1 = require("../inputs/SelectColony");
const utils_1 = require("../../common/utils/utils");
class ColoniesHandler {
    static getColony(game, colonyName, includeDiscardedColonies = false) {
        let colony = game.colonies.find((c) => c.name === colonyName);
        if (colony !== undefined)
            return colony;
        if (includeDiscardedColonies === true) {
            colony = game.discardedColonies.find((c) => c.name === colonyName);
            if (colony !== undefined)
                return colony;
        }
        throw new Error(`Unknown colony '${colonyName}'`);
    }
    static tradeableColonies(game) {
        return game.colonies.filter((colony) => colony.isActive && colony.visitor === undefined);
    }
    static maybeActivateColonies(game, card) {
        if (!game.gameOptions.coloniesExtension)
            return;
        game.colonies.forEach((colony) => {
            if (colony.isActive === false && ColoniesHandler.cardActivatesColony(colony, card)) {
                colony.isActive = true;
            }
        });
    }
    static cardActivatesColony(colony, card) {
        if (colony.isActive) {
            return true;
        }
        if (colony.metadata.cardResource !== undefined && colony.metadata.cardResource === card.resourceType) {
            return true;
        }
        if (colony.name === ColonyName_1.ColonyName.VENUS && card.tags.includes(Tag_1.Tag.VENUS) && card.resourceType !== undefined) {
            return true;
        }
        return false;
    }
    static addColonyTile(player, options) {
        const game = player.game;
        let colonyTiles = options?.colonies ?? game.discardedColonies;
        if (options?.activateableOnly === true) {
            colonyTiles = colonyTiles.filter((colonyTile) => colonyTileWillEnterActive(colonyTile, game));
        }
        if (colonyTiles.length === 0) {
            game.log('No availble colony tiles for ${0} to choose from', (b) => b.player(player));
            return;
        }
        const title = options?.title ?? 'Select colony tile to add';
        function colonyTileWillEnterActive(colony, game) {
            if (colony.isActive) {
                return true;
            }
            for (const player of game.getPlayers()) {
                for (const card of player.tableau) {
                    if (ColoniesHandler.cardActivatesColony(colony, card)) {
                        return true;
                    }
                }
            }
            return false;
        }
        const selectColonyTile = new SelectColony_1.SelectColony(title, 'Add colony tile', [...colonyTiles])
            .andThen((colonyTile) => {
            game.colonies.push(colonyTile);
            game.colonies.sort((a, b) => (a.name > b.name) ? 1 : -1);
            game.log('${0} added a new Colony tile: ${1}', (b) => b.player(player).colony(colonyTile));
            if (!colonyTile.isActive && colonyTileWillEnterActive(colonyTile, game)) {
                colonyTile.isActive = true;
            }
            (0, utils_1.inplaceRemove)(game.discardedColonies, colonyTile);
            options?.cb?.(colonyTile);
            return undefined;
        });
        selectColonyTile.showTileOnly = true;
        player.defer(selectColonyTile);
    }
}
exports.ColoniesHandler = ColoniesHandler;
