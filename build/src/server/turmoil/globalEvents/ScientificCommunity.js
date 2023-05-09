"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScientificCommunity = void 0;
const GlobalEvent_1 = require("./GlobalEvent");
const GlobalEventName_1 = require("../../../common/turmoil/globalEvents/GlobalEventName");
const PartyName_1 = require("../../../common/turmoil/PartyName");
const Resource_1 = require("../../../common/Resource");
const CardRenderer_1 = require("../../cards/render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
const RENDER_DATA = CardRenderer_1.CardRenderer.builder((b) => {
    b.megacredits(1).slash().cards(1).influence({ size: Size_1.Size.SMALL });
});
class ScientificCommunity extends GlobalEvent_1.GlobalEvent {
    constructor() {
        super({
            name: GlobalEventName_1.GlobalEventName.SCIENTIFIC_COMMUNITY,
            description: 'Gain 1 M€ for each card in hand (no limit) and influence.',
            revealedDelegate: PartyName_1.PartyName.REDS,
            currentDelegate: PartyName_1.PartyName.SCIENTISTS,
            renderData: RENDER_DATA,
        });
    }
    resolve(game, turmoil) {
        game.getPlayersInGenerationOrder().forEach((player) => {
            const amount = player.cardsInHand.length + turmoil.getPlayerInfluence(player);
            player.addResource(Resource_1.Resource.MEGACREDITS, amount, { log: true, from: this.name });
        });
    }
}
exports.ScientificCommunity = ScientificCommunity;
