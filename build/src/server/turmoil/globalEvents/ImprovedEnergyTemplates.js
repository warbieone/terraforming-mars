"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImprovedEnergyTemplates = void 0;
const GlobalEvent_1 = require("./GlobalEvent");
const GlobalEventName_1 = require("../../../common/turmoil/globalEvents/GlobalEventName");
const PartyName_1 = require("../../../common/turmoil/PartyName");
const Resource_1 = require("../../../common/Resource");
const Tag_1 = require("../../../common/cards/Tag");
const CardRenderer_1 = require("../../cards/render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
const Options_1 = require("../../cards/Options");
const RENDER_DATA = CardRenderer_1.CardRenderer.builder((b) => {
    b.production((pb) => pb.energy(1)).slash().energy(2, { played: Options_1.played }).influence({ size: Size_1.Size.SMALL });
});
class ImprovedEnergyTemplates extends GlobalEvent_1.GlobalEvent {
    constructor() {
        super({
            name: GlobalEventName_1.GlobalEventName.IMPROVED_ENERGY_TEMPLATES,
            description: 'Increase energy production 1 step per 2 power tags (no limit). Influence counts as power tags.',
            revealedDelegate: PartyName_1.PartyName.SCIENTISTS,
            currentDelegate: PartyName_1.PartyName.KELVINISTS,
            renderData: RENDER_DATA,
        });
    }
    resolve(game, turmoil) {
        game.getPlayersInGenerationOrder().forEach((player) => {
            player.production.add(Resource_1.Resource.ENERGY, Math.floor((player.tags.count(Tag_1.Tag.POWER, 'raw') + turmoil.getPlayerInfluence(player)) / 2), { log: true, from: this.name });
        });
    }
}
exports.ImprovedEnergyTemplates = ImprovedEnergyTemplates;
