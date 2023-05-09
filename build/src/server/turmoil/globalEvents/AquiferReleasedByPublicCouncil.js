"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AquiferReleasedByPublicCouncil = void 0;
const GlobalEvent_1 = require("./GlobalEvent");
const GlobalEventName_1 = require("../../../common/turmoil/globalEvents/GlobalEventName");
const PartyName_1 = require("../../../common/turmoil/PartyName");
const Resource_1 = require("../../../common/Resource");
const PlaceOceanTile_1 = require("../../deferredActions/PlaceOceanTile");
const CardRenderer_1 = require("../../cards/render/CardRenderer");
const RENDER_DATA = CardRenderer_1.CardRenderer.builder((b) => {
    b.oceans(1).nbsp.plants(1).steel(1).slash().influence();
});
class AquiferReleasedByPublicCouncil extends GlobalEvent_1.GlobalEvent {
    constructor() {
        super({
            name: GlobalEventName_1.GlobalEventName.AQUIFER_RELEASED_BY_PUBLIC_COUNCIL,
            description: 'First player places an ocean tile. Gain 1 plant and 1 steel per influence.',
            revealedDelegate: PartyName_1.PartyName.MARS,
            currentDelegate: PartyName_1.PartyName.GREENS,
            renderData: RENDER_DATA,
        });
    }
    resolve(game, turmoil) {
        game.defer(new PlaceOceanTile_1.PlaceOceanTile(game.getPlayersInGenerationOrder()[0], { title: 'Select space for ocean tile for Global Event' }));
        game.getPlayersInGenerationOrder().forEach((player) => {
            player.addResource(Resource_1.Resource.PLANTS, turmoil.getPlayerInfluence(player), { log: true, from: GlobalEventName_1.GlobalEventName.AQUIFER_RELEASED_BY_PUBLIC_COUNCIL });
            player.addResource(Resource_1.Resource.STEEL, turmoil.getPlayerInfluence(player), { log: true, from: GlobalEventName_1.GlobalEventName.AQUIFER_RELEASED_BY_PUBLIC_COUNCIL });
        });
    }
}
exports.AquiferReleasedByPublicCouncil = AquiferReleasedByPublicCouncil;
