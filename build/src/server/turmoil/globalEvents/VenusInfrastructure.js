"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VenusInfrastructure = void 0;
const GlobalEvent_1 = require("./GlobalEvent");
const GlobalEventName_1 = require("../../../common/turmoil/globalEvents/GlobalEventName");
const PartyName_1 = require("../../../common/turmoil/PartyName");
const Resource_1 = require("../../../common/Resource");
const Tag_1 = require("../../../common/cards/Tag");
const CardRenderer_1 = require("../../cards/render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
const Options_1 = require("../../cards/Options");
const RENDER_DATA = CardRenderer_1.CardRenderer.builder((b) => {
    b.megacredits(2).slash().venus(1, { played: Options_1.played }).influence({ size: Size_1.Size.SMALL });
});
class VenusInfrastructure extends GlobalEvent_1.GlobalEvent {
    constructor() {
        super({
            name: GlobalEventName_1.GlobalEventName.VENUS_INFRASTRUCTURE,
            description: 'Gain 2 M€ per Venus tag (max 5) and influence.',
            revealedDelegate: PartyName_1.PartyName.MARS,
            currentDelegate: PartyName_1.PartyName.UNITY,
            renderData: RENDER_DATA,
        });
    }
    resolve(game, turmoil) {
        game.getPlayersInGenerationOrder().forEach((player) => {
            const amount = Math.min(5, player.tags.count(Tag_1.Tag.VENUS, 'raw')) + turmoil.getPlayerInfluence(player);
            if (amount > 0) {
                player.addResource(Resource_1.Resource.MEGACREDITS, amount * 2, { log: true, from: this.name });
            }
        });
    }
}
exports.VenusInfrastructure = VenusInfrastructure;
