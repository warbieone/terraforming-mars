"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConstantStruggle = void 0;
const GlobalEvent_1 = require("./GlobalEvent");
const GlobalEventName_1 = require("../../../common/turmoil/globalEvents/GlobalEventName");
const PartyName_1 = require("../../../common/turmoil/PartyName");
const Resource_1 = require("../../../common/Resource");
const PathfindersExpansion_1 = require("../../pathfinders/PathfindersExpansion");
const Tag_1 = require("../../../common/cards/Tag");
const CardRenderer_1 = require("../../cards/render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
const RENDER_DATA = CardRenderer_1.CardRenderer.builder((b) => {
    b.minus().megacredits(10).influence({ size: Size_1.Size.SMALL }).planetaryTrack().text('2');
});
class ConstantStruggle extends GlobalEvent_1.GlobalEvent {
    constructor() {
        super({
            name: GlobalEventName_1.GlobalEventName.CONSTANT_STRUGGLE,
            description: 'Pay 10M€, reduced by 1M€ per influence. Raise every planetary track 2 steps. Nobody gains the "rising player" bonus.',
            revealedDelegate: PartyName_1.PartyName.KELVINISTS,
            currentDelegate: PartyName_1.PartyName.REDS,
            renderData: RENDER_DATA,
        });
    }
    resolve(game, turmoil) {
        game.getPlayersInGenerationOrder().forEach((player) => {
            const influence = turmoil.getPlayerInfluence(player);
            const deducted = Math.max(10 - influence, 0);
            player.deductResource(Resource_1.Resource.MEGACREDITS, deducted, { log: true, from: this.name });
        });
        PathfindersExpansion_1.PathfindersExpansion.raiseTrackForGlobalEvent(Tag_1.Tag.VENUS, this.name, game, 2, false);
        PathfindersExpansion_1.PathfindersExpansion.raiseTrackForGlobalEvent(Tag_1.Tag.EARTH, this.name, game, 2, false);
        PathfindersExpansion_1.PathfindersExpansion.raiseTrackForGlobalEvent(Tag_1.Tag.MARS, this.name, game, 2, false);
        PathfindersExpansion_1.PathfindersExpansion.raiseTrackForGlobalEvent(Tag_1.Tag.JOVIAN, this.name, game, 2, false);
        PathfindersExpansion_1.PathfindersExpansion.raiseTrackForGlobalEvent(Tag_1.Tag.MOON, this.name, game, 2, false);
    }
}
exports.ConstantStruggle = ConstantStruggle;
