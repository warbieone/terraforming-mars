"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColoniesHandler = void 0;
const ColonyName_1 = require("../../common/colonies/ColonyName");
const Tag_1 = require("../../common/cards/Tag");
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
}
exports.ColoniesHandler = ColoniesHandler;
