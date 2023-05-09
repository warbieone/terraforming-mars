"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommunicationBoom = void 0;
const GlobalEvent_1 = require("./GlobalEvent");
const GlobalEventName_1 = require("../../../common/turmoil/globalEvents/GlobalEventName");
const PartyName_1 = require("../../../common/turmoil/PartyName");
const Resource_1 = require("../../../common/Resource");
const CardResource_1 = require("../../../common/CardResource");
const AddResourcesToCards_1 = require("../../deferredActions/AddResourcesToCards");
const CardRenderer_1 = require("../../cards/render/CardRenderer");
const RENDER_DATA = CardRenderer_1.CardRenderer.builder((b) => {
    b.megacredits(-10).nbsp.data({ amount: 2 }).asterix().nbsp;
    b.data().slash().influence();
});
class CommunicationBoom extends GlobalEvent_1.GlobalEvent {
    constructor() {
        super({
            name: GlobalEventName_1.GlobalEventName.COMMUNICATION_BOOM,
            description: 'Pay 10M€. Add 2 data to EVERY data card. Add 1 data to any data card for each influence you have.',
            revealedDelegate: PartyName_1.PartyName.UNITY,
            currentDelegate: PartyName_1.PartyName.SCIENTISTS,
            renderData: RENDER_DATA,
        });
    }
    resolve(game, turmoil) {
        game.getPlayersInGenerationOrder().forEach((player) => {
            player.deductResource(Resource_1.Resource.MEGACREDITS, 10, { log: true, from: this.name });
            player.getResourceCards(CardResource_1.CardResource.DATA).forEach((card) => {
                player.addResourceTo(card, { qty: 2, log: true });
            });
            const count = turmoil.getPlayerInfluence(player);
            game.defer(new AddResourcesToCards_1.AddResourcesToCards(player, CardResource_1.CardResource.DATA, count));
        });
    }
}
exports.CommunicationBoom = CommunicationBoom;
