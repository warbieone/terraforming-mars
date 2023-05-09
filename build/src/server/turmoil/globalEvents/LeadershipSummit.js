"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadershipSummit = void 0;
const GlobalEvent_1 = require("./GlobalEvent");
const GlobalEventName_1 = require("../../../common/turmoil/globalEvents/GlobalEventName");
const PartyName_1 = require("../../../common/turmoil/PartyName");
const CardRenderer_1 = require("../../cards/render/CardRenderer");
const RENDER_DATA = CardRenderer_1.CardRenderer.builder((b) => {
    b.cards(1).slash().partyLeaders(1).plus().influence();
});
class LeadershipSummit extends GlobalEvent_1.GlobalEvent {
    constructor() {
        super({
            name: GlobalEventName_1.GlobalEventName.LEADERSHIP_SUMMIT,
            description: 'Draw 1 card for each party leader (max 5) and influence.',
            revealedDelegate: PartyName_1.PartyName.GREENS,
            currentDelegate: PartyName_1.PartyName.REDS,
            renderData: RENDER_DATA,
        });
    }
    resolve(game, turmoil) {
        game.getPlayersInGenerationOrder().forEach((player) => {
            const partyLeaderCount = turmoil.parties.filter((party) => party.partyLeader === player.id).length;
            player.drawCard(Math.min(5, partyLeaderCount) + turmoil.getPlayerInfluence(player));
        });
    }
}
exports.LeadershipSummit = LeadershipSummit;
