"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColonyDealer = void 0;
const ColonyName_1 = require("../../common/colonies/ColonyName");
const ColonyManifest_1 = require("./ColonyManifest");
class ColonyDealer {
    constructor(rng, gameOptions) {
        this.rng = rng;
        this.gameOptions = gameOptions;
        this.colonies = [];
        this.discardedColonies = [];
        let colonyTiles = ColonyManifest_1.BASE_COLONIES_TILES;
        if (ColonyDealer.includesCommunityColonies(gameOptions))
            colonyTiles = colonyTiles.concat(ColonyManifest_1.COMMUNITY_COLONIES_TILES);
        if (gameOptions.pathfindersExpansion || gameOptions.moonExpansion)
            colonyTiles = colonyTiles.concat(ColonyManifest_1.PATHFINDERS_COLONIES_TILES);
        if (gameOptions.moonExpansion && !this.gameOptions.pathfindersExpansion)
            colonyTiles.filter((c) => c.colonyName !== ColonyName_1.ColonyName.LEAVITT_II);
        if (!gameOptions.venusNextExtension)
            colonyTiles = colonyTiles.filter((c) => c.colonyName !== ColonyName_1.ColonyName.VENUS);
        if (!gameOptions.turmoilExtension)
            colonyTiles = colonyTiles.filter((c) => c.colonyName !== ColonyName_1.ColonyName.PALLAS);
        this.gameColonies = colonyTiles.map((cf) => new cf.Factory());
    }
    static includesCommunityColonies(gameOptions) {
        if (gameOptions.communityCardsOption)
            return true;
        const communityColonyNames = ColonyManifest_1.COMMUNITY_COLONIES_TILES.map((cf) => cf.colonyName);
        return gameOptions.customColoniesList.some((colonyName) => communityColonyNames.includes(colonyName));
    }
    shuffle(cards) {
        const deck = [];
        const copy = cards.slice();
        while (copy.length) {
            deck.push(copy.splice(Math.floor(this.rng.nextInt(copy.length)), 1)[0]);
        }
        return deck;
    }
    drawColonies(players) {
        const customColonies = this.gameOptions.customColoniesList;
        const colonies = customColonies.length === 0 ? this.gameColonies : this.gameColonies.filter((c) => customColonies.includes(c.name));
        const count = (players + 2) +
            (players <= 2 ? 1 : 0);
        if (colonies.length < count) {
            throw new Error(`Not enough valid colonies to choose from (want ${count}, has ${colonies.length}.) Remember that colonies like Venus and Pallas are invalid without Venus or Turmoil.`);
        }
        const tempDeck = this.shuffle(colonies);
        for (let i = 0; i < count; i++) {
            const colony = tempDeck.pop();
            if (colony === undefined) {
                throw new Error('Not enough colonies');
            }
            this.colonies.push(colony);
        }
        this.discardedColonies.push(...tempDeck);
        this.discardedColonies.sort((a, b) => (a.name > b.name) ? 1 : -1);
        this.colonies.sort((a, b) => (a.name > b.name) ? 1 : -1);
    }
    restore(activeColonies) {
        this.colonies = [...activeColonies];
        this.discardedColonies = this.gameColonies.filter((c) => {
            return !activeColonies.some((ac) => ac.name === c.name);
        });
    }
}
exports.ColonyDealer = ColonyDealer;
