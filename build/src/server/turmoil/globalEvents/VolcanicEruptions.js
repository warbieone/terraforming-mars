"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VolcanicEruptions = void 0;
const GlobalEvent_1 = require("./GlobalEvent");
const GlobalEventName_1 = require("../../../common/turmoil/globalEvents/GlobalEventName");
const PartyName_1 = require("../../../common/turmoil/PartyName");
const Resource_1 = require("../../../common/Resource");
const CardRenderer_1 = require("../../cards/render/CardRenderer");
const RENDER_DATA = CardRenderer_1.CardRenderer.builder((b) => {
    b.temperature(2).nbsp.production((pb) => pb.heat(1)).slash().influence();
});
class VolcanicEruptions extends GlobalEvent_1.GlobalEvent {
    constructor() {
        super({
            name: GlobalEventName_1.GlobalEventName.VOLCANIC_ERUPTIONS,
            description: 'Increase temperature 2 steps. Increase heat production 1 step per influence.',
            revealedDelegate: PartyName_1.PartyName.SCIENTISTS,
            currentDelegate: PartyName_1.PartyName.KELVINISTS,
            renderData: RENDER_DATA,
        });
    }
    resolve(game, turmoil) {
        game.increaseTemperature(game.getPlayersInGenerationOrder()[0], 2);
        game.getPlayersInGenerationOrder().forEach((player) => {
            const amount = turmoil.getPlayerInfluence(player);
            if (amount > 0) {
                player.production.add(Resource_1.Resource.HEAT, amount, { log: true, from: this.name });
            }
        });
    }
}
exports.VolcanicEruptions = VolcanicEruptions;
