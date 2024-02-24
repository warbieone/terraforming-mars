"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SnowCover = void 0;
const GlobalEvent_1 = require("./GlobalEvent");
const GlobalEventName_1 = require("../../../common/turmoil/globalEvents/GlobalEventName");
const PartyName_1 = require("../../../common/turmoil/PartyName");
const CardRenderer_1 = require("../../cards/render/CardRenderer");
const RENDER_DATA = CardRenderer_1.CardRenderer.builder((b) => {
    b.minus().temperature(2).nbsp.cards(1).slash().influence();
});
class SnowCover extends GlobalEvent_1.GlobalEvent {
    constructor() {
        super({
            name: GlobalEventName_1.GlobalEventName.SNOW_COVER,
            description: 'Decrease temperature 2 steps. Draw 1 card per influence.',
            revealedDelegate: PartyName_1.PartyName.KELVINISTS,
            currentDelegate: PartyName_1.PartyName.KELVINISTS,
            renderData: RENDER_DATA,
        });
    }
    resolve(game, turmoil) {
        game.increaseTemperature(game.getPlayersInGenerationOrder()[0], -2);
        game.getPlayersInGenerationOrder().forEach((player) => {
            player.drawCard(turmoil.getPlayerInfluence(player));
        });
    }
}
exports.SnowCover = SnowCover;
