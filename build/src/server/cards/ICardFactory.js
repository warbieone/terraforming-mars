"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCompatibleWith = void 0;
const utils_1 = require("../../common/utils/utils");
function isCompatibleWith(cf, gameOptions) {
    if (cf.compatibility === undefined) {
        return true;
    }
    const expansions = (0, utils_1.asArray)(cf.compatibility);
    return expansions.every((expansion) => {
        switch (expansion) {
            case 'venus':
                return gameOptions.venusNextExtension;
            case 'colonies':
                return gameOptions.coloniesExtension;
            case 'turmoil':
                return gameOptions.turmoilExtension;
            case 'prelude':
                return gameOptions.preludeExtension;
            case 'prelude2':
                return gameOptions.prelude2Expansion;
            case 'moon':
                return gameOptions.moonExpansion;
            case 'pathfinders':
                return gameOptions.pathfindersExpansion;
            case 'ares':
                return gameOptions.aresExtension;
            case 'ceo':
                return gameOptions.ceoExtension;
            case 'starwars':
                return gameOptions.starWarsExpansion;
            case 'underworld':
                return gameOptions.underworldExpansion;
        }
        throw new Error(`Unhandled expansion type ${expansion}`);
    });
}
exports.isCompatibleWith = isCompatibleWith;
//# sourceMappingURL=ICardFactory.js.map