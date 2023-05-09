"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerousFunding = void 0;
const GlobalEvent_1 = require("./GlobalEvent");
const GlobalEventName_1 = require("../../../common/turmoil/globalEvents/GlobalEventName");
const PartyName_1 = require("../../../common/turmoil/PartyName");
const Resource_1 = require("../../../common/Resource");
const CardRenderer_1 = require("../../cards/render/CardRenderer");
const Options_1 = require("../../cards/Options");
const RENDER_DATA = CardRenderer_1.CardRenderer.builder((b) => {
    b.megacredits(2).slash().influence().plus().tr(5, { digit: Options_1.digit, over: 15 }).br.br;
});
class GenerousFunding extends GlobalEvent_1.GlobalEvent {
    constructor() {
        super({
            name: GlobalEventName_1.GlobalEventName.GENEROUS_FUNDING,
            description: 'Gain 2 M€ for each influence and set of 5 TR over 15 (max 5 sets).',
            revealedDelegate: PartyName_1.PartyName.KELVINISTS,
            currentDelegate: PartyName_1.PartyName.UNITY,
            renderData: RENDER_DATA,
        });
    }
    resolve(game, turmoil) {
        game.getPlayersInGenerationOrder().forEach((player) => {
            const trSets = Math.max(0, Math.floor((player.getTerraformRating() - 15) / 5));
            const maxTRSets = 5;
            const totalSets = Math.min(maxTRSets, trSets) + turmoil.getPlayerInfluence(player);
            player.addResource(Resource_1.Resource.MEGACREDITS, 2 * totalSets, { log: true, from: this.name });
        });
    }
}
exports.GenerousFunding = GenerousFunding;
