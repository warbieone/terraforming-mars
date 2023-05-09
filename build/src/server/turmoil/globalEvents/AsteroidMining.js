"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsteroidMining = void 0;
const GlobalEvent_1 = require("./GlobalEvent");
const GlobalEventName_1 = require("../../../common/turmoil/globalEvents/GlobalEventName");
const PartyName_1 = require("../../../common/turmoil/PartyName");
const Resource_1 = require("../../../common/Resource");
const Tag_1 = require("../../../common/cards/Tag");
const CardRenderer_1 = require("../../cards/render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
const Options_1 = require("../../cards/Options");
const RENDER_DATA = CardRenderer_1.CardRenderer.builder((b) => {
    b.titanium(1).slash().jovian({ played: Options_1.played }).influence({ size: Size_1.Size.SMALL });
});
class AsteroidMining extends GlobalEvent_1.GlobalEvent {
    constructor() {
        super({
            name: GlobalEventName_1.GlobalEventName.ASTEROID_MINING,
            description: 'Gain 1 titanium for each Jovian tag (max 5) and influence.',
            revealedDelegate: PartyName_1.PartyName.REDS,
            currentDelegate: PartyName_1.PartyName.UNITY,
            renderData: RENDER_DATA,
        });
    }
    resolve(game, turmoil) {
        game.getPlayersInGenerationOrder().forEach((player) => {
            player.addResource(Resource_1.Resource.TITANIUM, Math.min(5, player.tags.count(Tag_1.Tag.JOVIAN, 'raw')) + turmoil.getPlayerInfluence(player), { log: true, from: this.name });
        });
    }
}
exports.AsteroidMining = AsteroidMining;
