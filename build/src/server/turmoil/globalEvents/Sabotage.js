"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sabotage = void 0;
const GlobalEvent_1 = require("./GlobalEvent");
const GlobalEventName_1 = require("../../../common/turmoil/globalEvents/GlobalEventName");
const PartyName_1 = require("../../../common/turmoil/PartyName");
const Resource_1 = require("../../../common/Resource");
const CardRenderer_1 = require("../../cards/render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
const RENDER_DATA = CardRenderer_1.CardRenderer.builder((b) => {
    b.br.production((pb) => pb.minus().energy(1).steel(1)).nbsp.nbsp;
    b.steel(1).slash().nbsp.influence({ size: Size_1.Size.SMALL });
});
class Sabotage extends GlobalEvent_1.GlobalEvent {
    constructor() {
        super({
            name: GlobalEventName_1.GlobalEventName.SABOTAGE,
            description: 'Decrease steel and energy production 1 step each. Gain 1 steel per influence.',
            revealedDelegate: PartyName_1.PartyName.UNITY,
            currentDelegate: PartyName_1.PartyName.REDS,
            renderData: RENDER_DATA,
        });
    }
    resolve(game, turmoil) {
        game.getPlayersInGenerationOrder().forEach((player) => {
            if (player.production.energy >= 1) {
                player.production.add(Resource_1.Resource.ENERGY, -1, { log: true, from: this.name });
            }
            if (player.production.steel >= 1) {
                player.production.add(Resource_1.Resource.STEEL, -1, { log: true, from: this.name });
            }
            player.addResource(Resource_1.Resource.STEEL, turmoil.getPlayerInfluence(player), { log: true, from: this.name });
        });
    }
}
exports.Sabotage = Sabotage;
