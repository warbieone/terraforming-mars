"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SponsoredProjects = void 0;
const GlobalEvent_1 = require("./GlobalEvent");
const GlobalEventName_1 = require("../../../common/turmoil/globalEvents/GlobalEventName");
const PartyName_1 = require("../../../common/turmoil/PartyName");
const CardRenderer_1 = require("../../cards/render/CardRenderer");
const AltSecondaryTag_1 = require("../../../common/cards/render/AltSecondaryTag");
const RENDER_DATA = CardRenderer_1.CardRenderer.builder((b) => {
    b.br.cards(1, { secondaryTag: AltSecondaryTag_1.AltSecondaryTag.WILD_RESOURCE }).colon().wild(1).nbsp;
    b.cards(1).slash().influence();
});
class SponsoredProjects extends GlobalEvent_1.GlobalEvent {
    constructor() {
        super({
            name: GlobalEventName_1.GlobalEventName.SPONSORED_PROJECTS,
            description: 'All cards with resources on them gain 1 resource. Draw 1 card for each influence.',
            revealedDelegate: PartyName_1.PartyName.SCIENTISTS,
            currentDelegate: PartyName_1.PartyName.GREENS,
            renderData: RENDER_DATA,
        });
    }
    resolve(game, turmoil) {
        game.getPlayersInGenerationOrder().forEach((player) => {
            player.getCardsWithResources().forEach((card) => card.resourceCount && player.addResourceTo(card));
            player.drawCard(turmoil.getPlayerInfluence(player));
        });
    }
}
exports.SponsoredProjects = SponsoredProjects;
