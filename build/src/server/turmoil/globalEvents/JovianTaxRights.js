"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JovianTaxRights = void 0;
const GlobalEvent_1 = require("./GlobalEvent");
const GlobalEventName_1 = require("../../../common/turmoil/globalEvents/GlobalEventName");
const PartyName_1 = require("../../../common/turmoil/PartyName");
const Resource_1 = require("../../../common/Resource");
const CardRenderer_1 = require("../../cards/render/CardRenderer");
const RENDER_DATA = CardRenderer_1.CardRenderer.builder((b) => {
    b.production((pb) => pb.megacredits(1)).slash().colonies(1).nbsp.titanium(1).slash().influence();
});
class JovianTaxRights extends GlobalEvent_1.GlobalEvent {
    constructor() {
        super({
            name: GlobalEventName_1.GlobalEventName.JOVIAN_TAX_RIGHTS,
            description: 'Increase M€ production 1 step for each colony. Gain 1 titanium for each influence.',
            revealedDelegate: PartyName_1.PartyName.SCIENTISTS,
            currentDelegate: PartyName_1.PartyName.UNITY,
            renderData: RENDER_DATA,
        });
    }
    resolve(game, turmoil) {
        game.getPlayersInGenerationOrder().forEach((player) => {
            let coloniesCount = 0;
            game.colonies.forEach((colony) => {
                coloniesCount += colony.colonies.filter((owner) => owner === player.id).length;
            });
            player.production.add(Resource_1.Resource.MEGACREDITS, coloniesCount, { log: true, from: this.name });
            player.addResource(Resource_1.Resource.TITANIUM, turmoil.getPlayerInfluence(player), { log: true, from: this.name });
        });
    }
}
exports.JovianTaxRights = JovianTaxRights;
