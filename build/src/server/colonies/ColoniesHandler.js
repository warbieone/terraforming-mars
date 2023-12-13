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
    static onCardPlayed(game, card) {
        if (!game.gameOptions.coloniesExtension)
            return;
        game.colonies.forEach((colony) => {
            ColoniesHandler.maybeActivateColony(colony, card);
        });
    }
    static maybeActivateColony(colony, card) {
        if (colony.isActive !== true) {
            if (colony.metadata.cardResource !== undefined && colony.metadata.cardResource === card.resourceType) {
                colony.isActive = true;
            }
            if (colony.name === ColonyName_1.ColonyName.VENUS && card.tags.includes(Tag_1.Tag.VENUS) && card.resourceType !== undefined) {
                colony.isActive = true;
            }
        }
        return colony.isActive;
    }
    static addColonyTile(player, options) {
        var _a, _b;
        const game = player.game;
        const colonyTiles = (_a = options === null || options === void 0 ? void 0 : options.colonies) !== null && _a !== void 0 ? _a : game.discardedColonies;
        if (colonyTiles.length === 0) {
            game.log('No availble colony tiles for ${0} to choose from', (b) => b.player(player));
            return;
        }
        const title = (_b = options === null || options === void 0 ? void 0 : options.title) !== null && _b !== void 0 ? _b : 'Select colony tile to add';
        function maybeActivateNewColonyTile(colony, game) {
            if (colony.isActive)
                return;
            for (const player of game.getPlayers()) {
                for (const card of player.tableau) {
                    const active = ColoniesHandler.maybeActivateColony(colony, card);
                    if (active) {
                        return;
                    }
                }
            }
        }
        const selectColonyTile = new SelectColony_1.SelectColony(title, 'Add colony tile', colonyTiles)
            .andThen((colonyTile) => {
            var _a;
            game.colonies.push(colonyTile);
            game.colonies.sort((a, b) => (a.name > b.name) ? 1 : -1);
            game.log('${0} added a new Colony tile: ${1}', (b) => b.player(player).colony(colonyTile));
            maybeActivateNewColonyTile(colonyTile, game);
            (0, utils_1.inplaceRemove)(game.discardedColonies, colonyTile);
            (_a = options === null || options === void 0 ? void 0 : options.cb) === null || _a === void 0 ? void 0 : _a.call(options, colonyTile);
            return undefined;
        });
        selectColonyTile.showTileOnly = true;
        player.defer(selectColonyTile);
    }
}
exports.ColoniesHandler = ColoniesHandler;
//# sourceMappingURL=ColoniesHandler.js.map