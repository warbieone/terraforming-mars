"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuccessfulOrganisms = void 0;
const GlobalEvent_1 = require("./GlobalEvent");
const GlobalEventName_1 = require("../../../common/turmoil/globalEvents/GlobalEventName");
const PartyName_1 = require("../../../common/turmoil/PartyName");
const Resource_1 = require("../../../common/Resource");
const CardRenderer_1 = require("../../cards/render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
const RENDER_DATA = CardRenderer_1.CardRenderer.builder((b) => {
    b.vSpace().br.plants(1).slash().production((pb) => pb.plants(1)).nbsp.influence({ size: Size_1.Size.SMALL });
});
class SuccessfulOrganisms extends GlobalEvent_1.GlobalEvent {
    constructor() {
        super({
            name: GlobalEventName_1.GlobalEventName.SUCCESSFUL_ORGANISMS,
            description: 'Gain 1 plant per plant production (max 5) and influence.',
            revealedDelegate: PartyName_1.PartyName.MARS,
            currentDelegate: PartyName_1.PartyName.SCIENTISTS,
            renderData: RENDER_DATA,
        });
    }
    resolve(game, turmoil) {
        game.getPlayersInGenerationOrder().forEach((player) => {
            player.addResource(Resource_1.Resource.PLANTS, Math.min(5, player.production.plants) + turmoil.getPlayerInfluence(player), { log: true, from: this.name });
        });
    }
}
exports.SuccessfulOrganisms = SuccessfulOrganisms;
