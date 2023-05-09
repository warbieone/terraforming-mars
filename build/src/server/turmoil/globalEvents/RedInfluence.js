"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedInfluence = void 0;
const GlobalEvent_1 = require("./GlobalEvent");
const GlobalEventName_1 = require("../../../common/turmoil/globalEvents/GlobalEventName");
const PartyName_1 = require("../../../common/turmoil/PartyName");
const Resource_1 = require("../../../common/Resource");
const CardRenderer_1 = require("../../cards/render/CardRenderer");
const Options_1 = require("../../cards/Options");
const RENDER_DATA = CardRenderer_1.CardRenderer.builder((b) => {
    b.br.br.megacredits(-3).slash().tr(5, { digit: Options_1.digit, over: 10 }).nbsp.production((pb) => pb.megacredits(1)).slash().influence();
});
class RedInfluence extends GlobalEvent_1.GlobalEvent {
    constructor() {
        super({
            name: GlobalEventName_1.GlobalEventName.RED_INFLUENCE,
            description: 'Lose 3 M€ for each set of 5 TR over 10 (max 5 sets). Increase M€ production 1 step per influence.',
            revealedDelegate: PartyName_1.PartyName.KELVINISTS,
            currentDelegate: PartyName_1.PartyName.REDS,
            renderData: RENDER_DATA,
        });
    }
    resolve(game, turmoil) {
        game.getPlayersInGenerationOrder().forEach((player) => {
            const sets = Math.floor((player.getTerraformRating() - 10) / 5);
            if (sets > 0) {
                const amount = Math.min(sets, 5);
                player.deductResource(Resource_1.Resource.MEGACREDITS, amount * 3, { log: true, from: this.name });
            }
            player.production.add(Resource_1.Resource.MEGACREDITS, turmoil.getPlayerInfluence(player), { log: true, from: this.name });
        });
    }
}
exports.RedInfluence = RedInfluence;
