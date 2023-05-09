"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MagneticFieldStimulationDelays = void 0;
const GlobalEvent_1 = require("./GlobalEvent");
const GlobalEventName_1 = require("../../../common/turmoil/globalEvents/GlobalEventName");
const PartyName_1 = require("../../../common/turmoil/PartyName");
const CardRenderer_1 = require("../../cards/render/CardRenderer");
const RENDER_DATA = CardRenderer_1.CardRenderer.builder((b) => {
    b.minus().temperature(2).nbsp.minus().oxygen(2);
});
class MagneticFieldStimulationDelays extends GlobalEvent_1.GlobalEvent {
    constructor() {
        super({
            name: GlobalEventName_1.GlobalEventName.MAGNETIC_FIELD_STIMULATION_DELAYS,
            description: 'Lower the temperature and oxygen 2 steps each. (-4C, -2% O2)',
            revealedDelegate: PartyName_1.PartyName.REDS,
            currentDelegate: PartyName_1.PartyName.GREENS,
            renderData: RENDER_DATA,
        });
    }
    resolve(game) {
        game.increaseOxygenLevel(game.getPlayersInGenerationOrder()[0], -2);
        game.increaseTemperature(game.getPlayersInGenerationOrder()[0], -2);
    }
}
exports.MagneticFieldStimulationDelays = MagneticFieldStimulationDelays;
