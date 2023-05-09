"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalDustStorm = void 0;
const GlobalEvent_1 = require("./GlobalEvent");
const GlobalEventName_1 = require("../../../common/turmoil/globalEvents/GlobalEventName");
const PartyName_1 = require("../../../common/turmoil/PartyName");
const Resource_1 = require("../../../common/Resource");
const Tag_1 = require("../../../common/cards/Tag");
const CardRenderer_1 = require("../../cards/render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
const Options_1 = require("../../cards/Options");
const RENDER_DATA = CardRenderer_1.CardRenderer.builder((b) => {
    b.text('lose all').heat(1).br.megacredits(-2).slash().building(1, { played: Options_1.played }).influence({ size: Size_1.Size.SMALL });
});
class GlobalDustStorm extends GlobalEvent_1.GlobalEvent {
    constructor() {
        super({
            name: GlobalEventName_1.GlobalEventName.GLOBAL_DUST_STORM,
            description: 'Lose all heat. Lose 2 M€ for each building tag (max 5, then reduced by influence).',
            revealedDelegate: PartyName_1.PartyName.KELVINISTS,
            currentDelegate: PartyName_1.PartyName.GREENS,
            renderData: RENDER_DATA,
        });
    }
    resolve(game, turmoil) {
        game.getPlayersInGenerationOrder().forEach((player) => {
            if (player.heat > 0) {
                player.deductResource(Resource_1.Resource.HEAT, player.heat, { log: true, from: this.name });
            }
            const maxedSteelTags = Math.min(5, player.tags.count(Tag_1.Tag.BUILDING, 'raw'));
            player.deductResource(Resource_1.Resource.MEGACREDITS, 2 * Math.max(0, maxedSteelTags - turmoil.getPlayerInfluence(player)), { log: true, from: this.name });
        });
    }
}
exports.GlobalDustStorm = GlobalDustStorm;
