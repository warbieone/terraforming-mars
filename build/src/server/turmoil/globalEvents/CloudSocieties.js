"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudSocieties = void 0;
const GlobalEvent_1 = require("./GlobalEvent");
const GlobalEventName_1 = require("../../../common/turmoil/globalEvents/GlobalEventName");
const PartyName_1 = require("../../../common/turmoil/PartyName");
const CardResource_1 = require("../../../common/CardResource");
const AddResourcesToCard_1 = require("../../deferredActions/AddResourcesToCard");
const CardRenderer_1 = require("../../cards/render/CardRenderer");
const AltSecondaryTag_1 = require("../../../common/cards/render/AltSecondaryTag");
const RENDER_DATA = CardRenderer_1.CardRenderer.builder((b) => {
    b.br.cards(1, { secondaryTag: AltSecondaryTag_1.AltSecondaryTag.FLOATER }).colon().floaters(1).nbsp;
    b.floaters(1).slash().influence();
});
class CloudSocieties extends GlobalEvent_1.GlobalEvent {
    constructor() {
        super({
            name: GlobalEventName_1.GlobalEventName.CLOUD_SOCIETIES,
            description: 'Add a floater to each card that can collect floaters. Add 1 floater for each influence to a card.',
            revealedDelegate: PartyName_1.PartyName.UNITY,
            currentDelegate: PartyName_1.PartyName.REDS,
            renderData: RENDER_DATA,
        });
    }
    resolve(game, turmoil) {
        game.getPlayersInGenerationOrder().forEach((player) => {
            const resourceCards = player.getResourceCards(CardResource_1.CardResource.FLOATER);
            resourceCards.forEach((card) => {
                player.addResourceTo(card, 1);
            });
            const amount = turmoil.getPlayerInfluence(player);
            if (amount > 0) {
                game.defer(new AddResourcesToCard_1.AddResourcesToCard(player, CardResource_1.CardResource.FLOATER, { count: amount }));
            }
        });
    }
}
exports.CloudSocieties = CloudSocieties;
