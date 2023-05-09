"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WarOnEarth = void 0;
const GlobalEvent_1 = require("./GlobalEvent");
const GlobalEventName_1 = require("../../../common/turmoil/globalEvents/GlobalEventName");
const PartyName_1 = require("../../../common/turmoil/PartyName");
const CardRenderer_1 = require("../../cards/render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
const RENDER_DATA = CardRenderer_1.CardRenderer.builder((b) => {
    b.minus().text('4').tr(1).influence({ size: Size_1.Size.SMALL });
});
class WarOnEarth extends GlobalEvent_1.GlobalEvent {
    constructor() {
        super({
            name: GlobalEventName_1.GlobalEventName.WAR_ON_EARTH,
            description: 'Reduce TR 4 steps. Each influence prevents 1 step.',
            revealedDelegate: PartyName_1.PartyName.MARS,
            currentDelegate: PartyName_1.PartyName.KELVINISTS,
            renderData: RENDER_DATA,
        });
    }
    resolve(game, turmoil) {
        game.getPlayersInGenerationOrder().forEach((player) => {
            player.decreaseTerraformRatingSteps(4 - turmoil.getPlayerInfluence(player), { log: true });
        });
    }
}
exports.WarOnEarth = WarOnEarth;
