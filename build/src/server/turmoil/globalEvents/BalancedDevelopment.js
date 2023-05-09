"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalancedDevelopment = void 0;
const GlobalEvent_1 = require("./GlobalEvent");
const GlobalEventName_1 = require("../../../common/turmoil/globalEvents/GlobalEventName");
const PartyName_1 = require("../../../common/turmoil/PartyName");
const Tag_1 = require("../../../common/cards/Tag");
const Resource_1 = require("../../../common/Resource");
const CardRenderer_1 = require("../../cards/render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
const RENDER_DATA = CardRenderer_1.CardRenderer.builder((b) => {
    b.megacredits(2).slash().mars(1, { played: true }).influence({ size: Size_1.Size.SMALL });
});
class BalancedDevelopment extends GlobalEvent_1.GlobalEvent {
    constructor() {
        super({
            name: GlobalEventName_1.GlobalEventName.BALANCED_DEVELOPMENT,
            description: 'Gain 2M€ for each Mars tag you have (max 5) and influence.',
            revealedDelegate: PartyName_1.PartyName.UNITY,
            currentDelegate: PartyName_1.PartyName.MARS,
            renderData: RENDER_DATA,
        });
    }
    resolve(game, turmoil) {
        game.getPlayersInGenerationOrder().forEach((player) => {
            const tags = player.tags.count(Tag_1.Tag.MARS, 'raw');
            const total = Math.min(tags, 5) + turmoil.getPlayerInfluence(player);
            player.addResource(Resource_1.Resource.MEGACREDITS, 2 * total, { log: true, from: this.name });
        });
    }
}
exports.BalancedDevelopment = BalancedDevelopment;
