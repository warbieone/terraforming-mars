"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Diversity = void 0;
const GlobalEvent_1 = require("./GlobalEvent");
const GlobalEventName_1 = require("../../../common/turmoil/globalEvents/GlobalEventName");
const PartyName_1 = require("../../../common/turmoil/PartyName");
const Resource_1 = require("../../../common/Resource");
const CardRenderer_1 = require("../../cards/render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
const RENDER_DATA = CardRenderer_1.CardRenderer.builder((b) => {
    b.vSpace(Size_1.Size.MEDIUM).br.text('9').diverseTag(1).influence({ size: Size_1.Size.SMALL }).colon().megacredits(10);
});
class Diversity extends GlobalEvent_1.GlobalEvent {
    constructor() {
        super({
            name: GlobalEventName_1.GlobalEventName.DIVERSITY,
            description: 'Gain 10 M€ if you have 9 or more different tags. Influence counts as unique tags.',
            revealedDelegate: PartyName_1.PartyName.SCIENTISTS,
            currentDelegate: PartyName_1.PartyName.SCIENTISTS,
            renderData: RENDER_DATA,
        });
    }
    resolve(game, turmoil) {
        game.getPlayersInGenerationOrder().forEach((player) => {
            if (player.tags.distinctCount('globalEvent') + turmoil.getPlayerInfluence(player) >= 9) {
                player.addResource(Resource_1.Resource.MEGACREDITS, 10, { log: true, from: this.name });
            }
        });
    }
}
exports.Diversity = Diversity;
