"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CorrosiveRain = void 0;
const GlobalEvent_1 = require("./GlobalEvent");
const GlobalEventName_1 = require("../../../common/turmoil/globalEvents/GlobalEventName");
const PartyName_1 = require("../../../common/turmoil/PartyName");
const CorrosiveRainDeferredAction_1 = require("../../deferredActions/CorrosiveRainDeferredAction");
const CardRenderer_1 = require("../../cards/render/CardRenderer");
const RENDER_DATA = CardRenderer_1.CardRenderer.builder((b) => {
    b.minus().floaters(2).or().megacredits(-10).br.cards(1).slash().influence();
});
class CorrosiveRain extends GlobalEvent_1.GlobalEvent {
    constructor() {
        super({
            name: GlobalEventName_1.GlobalEventName.CORROSIVE_RAIN,
            description: 'Lose 2 floaters from a card or 10 M€. Draw 1 card for each influence.',
            revealedDelegate: PartyName_1.PartyName.KELVINISTS,
            currentDelegate: PartyName_1.PartyName.GREENS,
            renderData: RENDER_DATA,
        });
    }
    resolve(game, turmoil) {
        game.getPlayersInGenerationOrder().forEach((player) => {
            player.drawCard(turmoil.getPlayerInfluence(player));
            game.defer(new CorrosiveRainDeferredAction_1.CorrosiveRainDeferredAction(player));
        });
    }
}
exports.CorrosiveRain = CorrosiveRain;
