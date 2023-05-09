"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EcoSabotage = void 0;
const GlobalEvent_1 = require("./GlobalEvent");
const GlobalEventName_1 = require("../../../common/turmoil/globalEvents/GlobalEventName");
const PartyName_1 = require("../../../common/turmoil/PartyName");
const Resource_1 = require("../../../common/Resource");
const CardRenderer_1 = require("../../cards/render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
const RENDER_DATA = CardRenderer_1.CardRenderer.builder((b) => {
    b.text('max 3').plants(1).influence({ size: Size_1.Size.SMALL });
});
class EcoSabotage extends GlobalEvent_1.GlobalEvent {
    constructor() {
        super({
            name: GlobalEventName_1.GlobalEventName.ECO_SABOTAGE,
            description: 'Lose all plants except 3 + influence.',
            revealedDelegate: PartyName_1.PartyName.GREENS,
            currentDelegate: PartyName_1.PartyName.REDS,
            renderData: RENDER_DATA,
        });
    }
    resolve(game, turmoil) {
        game.getPlayersInGenerationOrder().forEach((player) => {
            const plants = player.plants;
            const maxPlants = 3 + turmoil.getPlayerInfluence(player);
            const plantDecrease = Math.max(0, plants - maxPlants);
            player.deductResource(Resource_1.Resource.PLANTS, plantDecrease, { log: true, from: this.name });
        });
    }
}
exports.EcoSabotage = EcoSabotage;
