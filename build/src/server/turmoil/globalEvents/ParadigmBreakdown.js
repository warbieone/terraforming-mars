"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParadigmBreakdown = void 0;
const GlobalEvent_1 = require("./GlobalEvent");
const GlobalEventName_1 = require("../../../common/turmoil/globalEvents/GlobalEventName");
const PartyName_1 = require("../../../common/turmoil/PartyName");
const Resource_1 = require("../../../common/Resource");
const DiscardCards_1 = require("../../deferredActions/DiscardCards");
const CardRenderer_1 = require("../../cards/render/CardRenderer");
const RENDER_DATA = CardRenderer_1.CardRenderer.builder((b) => {
    b.br.minus().cards(2).nbsp.megacredits(2).influence();
});
class ParadigmBreakdown extends GlobalEvent_1.GlobalEvent {
    constructor() {
        super({
            name: GlobalEventName_1.GlobalEventName.PARADIGM_BREAKDOWN,
            description: 'Discard 2 cards from hand. Gain 2 M€ per influence.',
            revealedDelegate: PartyName_1.PartyName.KELVINISTS,
            currentDelegate: PartyName_1.PartyName.REDS,
            renderData: RENDER_DATA,
        });
    }
    resolve(game, turmoil) {
        game.getPlayersInGenerationOrder().forEach((player) => {
            if (player.cardsInHand.length >= 2) {
                game.defer(new DiscardCards_1.DiscardCards(player, 2, 'Global Event - Select 2 cards to discard'));
            }
            else if (player.cardsInHand.length === 1) {
                game.defer(new DiscardCards_1.DiscardCards(player, 1, 'Global Event - Select a card to discard'));
            }
            player.addResource(Resource_1.Resource.MEGACREDITS, 2 * (turmoil.getPlayerInfluence(player)), { log: true, from: this.name });
        });
    }
}
exports.ParadigmBreakdown = ParadigmBreakdown;
