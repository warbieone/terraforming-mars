"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TiredEarth = void 0;
const GlobalEvent_1 = require("./GlobalEvent");
const GlobalEventName_1 = require("../../../common/turmoil/globalEvents/GlobalEventName");
const PartyName_1 = require("../../../common/turmoil/PartyName");
const Tag_1 = require("../../../common/cards/Tag");
const Resource_1 = require("../../../common/Resource");
const CardRenderer_1 = require("../../cards/render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
const RENDER_DATA = CardRenderer_1.CardRenderer.builder((b) => {
    b.minus().plants(1).slash().earth(1, { played: true }).influence({ size: Size_1.Size.SMALL });
});
class TiredEarth extends GlobalEvent_1.GlobalEvent {
    constructor() {
        super({
            name: GlobalEventName_1.GlobalEventName.TIRED_EARTH,
            description: 'Lose 1 plant for each Earth tag you own (max 5) then reduced by influence.',
            revealedDelegate: PartyName_1.PartyName.KELVINISTS,
            currentDelegate: PartyName_1.PartyName.GREENS,
            renderData: RENDER_DATA,
        });
    }
    resolve(game, turmoil) {
        game.getPlayersInGenerationOrder().forEach((player) => {
            const tags = player.tags.count(Tag_1.Tag.EARTH, 'raw');
            const rawTotal = Math.min(tags, 5) - turmoil.getPlayerInfluence(player);
            const total = Math.max(rawTotal, 0);
            player.deductResource(Resource_1.Resource.PLANTS, total, { log: true, from: this.name });
        });
    }
}
exports.TiredEarth = TiredEarth;
