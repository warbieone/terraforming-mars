"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StrongSociety = void 0;
const GlobalEvent_1 = require("./GlobalEvent");
const GlobalEventName_1 = require("../../../common/turmoil/globalEvents/GlobalEventName");
const PartyName_1 = require("../../../common/turmoil/PartyName");
const Resource_1 = require("../../../common/Resource");
const CardRenderer_1 = require("../../cards/render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
const RENDER_DATA = CardRenderer_1.CardRenderer.builder((b) => {
    b.megacredits(2).slash().city().influence({ size: Size_1.Size.SMALL });
});
class StrongSociety extends GlobalEvent_1.GlobalEvent {
    constructor() {
        super({
            name: GlobalEventName_1.GlobalEventName.STRONG_SOCIETY,
            description: 'Gain 2 M€ for each city tile (max 5) and influence.',
            revealedDelegate: PartyName_1.PartyName.REDS,
            currentDelegate: PartyName_1.PartyName.MARS,
            renderData: RENDER_DATA,
        });
    }
    resolve(game, turmoil) {
        game.getPlayersInGenerationOrder().forEach((player) => {
            const amount = Math.min(5, player.game.getCitiesCount(player)) + turmoil.getPlayerInfluence(player);
            if (amount > 0) {
                player.addResource(Resource_1.Resource.MEGACREDITS, amount * 2, { log: true, from: this.name });
            }
        });
    }
}
exports.StrongSociety = StrongSociety;
