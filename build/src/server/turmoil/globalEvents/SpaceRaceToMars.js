"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpaceRaceToMars = void 0;
const GlobalEvent_1 = require("./GlobalEvent");
const GlobalEventName_1 = require("../../../common/turmoil/globalEvents/GlobalEventName");
const PartyName_1 = require("../../../common/turmoil/PartyName");
const Resource_1 = require("../../../common/Resource");
const Board_1 = require("../../boards/Board");
const MoonExpansion_1 = require("../../moon/MoonExpansion");
const CardRenderer_1 = require("../../cards/render/CardRenderer");
const RENDER_DATA = CardRenderer_1.CardRenderer.builder((b) => {
    b.production((pb) => pb.megacredits(1)).slash().specialTile().nbsp;
    b.energy(1).slash().influence();
});
class SpaceRaceToMars extends GlobalEvent_1.GlobalEvent {
    constructor() {
        super({
            name: GlobalEventName_1.GlobalEventName.SPACE_RACE_TO_MARS,
            description: 'Increase your M€ production 1 step for every special tile you own (max 5.) Gain 1 energy for every influence you have',
            revealedDelegate: PartyName_1.PartyName.SCIENTISTS,
            currentDelegate: PartyName_1.PartyName.MARS,
            renderData: RENDER_DATA,
        });
    }
    resolve(game, turmoil) {
        game.getPlayersInGenerationOrder().forEach((player) => {
            const specialTileCount = this.specialTileCount(player);
            const bonus = Math.min(specialTileCount, 5);
            player.production.add(Resource_1.Resource.MEGACREDITS, bonus, { log: true, from: this.name });
            player.addResource(Resource_1.Resource.ENERGY, turmoil.getPlayerInfluence(player), { log: true, from: this.name });
        });
    }
    specialTileCount(player) {
        const spaces = player.game.board.spaces
            .filter((0, Board_1.playerTileFn)(player))
            .filter(Board_1.isSpecialTile);
        const marsCount = spaces.length;
        const moonCount = MoonExpansion_1.MoonExpansion.ifElseMoon(player.game, (moonData) => {
            return moonData.moon.spaces
                .filter((0, Board_1.playerTileFn)(player))
                .filter(Board_1.isSpecialTile)
                .length;
        }, () => 0);
        return marsCount + moonCount;
    }
}
exports.SpaceRaceToMars = SpaceRaceToMars;
