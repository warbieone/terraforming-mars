"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MicrogravityHealthProblems = void 0;
const GlobalEvent_1 = require("./GlobalEvent");
const GlobalEventName_1 = require("../../../common/turmoil/globalEvents/GlobalEventName");
const PartyName_1 = require("../../../common/turmoil/PartyName");
const Resource_1 = require("../../../common/Resource");
const CardRenderer_1 = require("../../cards/render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
const RENDER_DATA = CardRenderer_1.CardRenderer.builder((b) => {
    b.megacredits(-3).slash().colonies(1).influence({ size: Size_1.Size.SMALL });
});
class MicrogravityHealthProblems extends GlobalEvent_1.GlobalEvent {
    constructor() {
        super({
            name: GlobalEventName_1.GlobalEventName.MICROGRAVITY_HEALTH_PROBLEMS,
            description: 'Lose 3 M€ for each colony (max 5, then reduced by influence).',
            revealedDelegate: PartyName_1.PartyName.MARS,
            currentDelegate: PartyName_1.PartyName.SCIENTISTS,
            renderData: RENDER_DATA,
        });
    }
    resolve(game, turmoil) {
        game.getPlayersInGenerationOrder().forEach((player) => {
            let coloniesCount = 0;
            game.colonies.forEach((colony) => {
                coloniesCount += colony.colonies.filter((owner) => owner === player.id).length;
            });
            player.deductResource(Resource_1.Resource.MEGACREDITS, 3 * Math.max(0, Math.min(5, coloniesCount) - turmoil.getPlayerInfluence(player)), { log: true, from: this.name });
        });
    }
}
exports.MicrogravityHealthProblems = MicrogravityHealthProblems;
