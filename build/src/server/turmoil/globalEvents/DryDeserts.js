"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DryDeserts = void 0;
const GlobalEvent_1 = require("./GlobalEvent");
const GlobalEventName_1 = require("../../../common/turmoil/globalEvents/GlobalEventName");
const PartyName_1 = require("../../../common/turmoil/PartyName");
const RemoveOceanTile_1 = require("../../deferredActions/RemoveOceanTile");
const GainResources_1 = require("../../inputs/GainResources");
const CardRenderer_1 = require("../../cards/render/CardRenderer");
const MessageBuilder_1 = require("../../logs/MessageBuilder");
const RENDER_DATA = CardRenderer_1.CardRenderer.builder((b) => {
    b.minus().oceans(1).nbsp.nbsp.wild(1).slash().influence();
});
class DryDeserts extends GlobalEvent_1.GlobalEvent {
    constructor() {
        super({
            name: GlobalEventName_1.GlobalEventName.DRY_DESERTS,
            description: 'First player removes 1 ocean tile from the gameboard. Gain 1 standard resource per influence.',
            revealedDelegate: PartyName_1.PartyName.REDS,
            currentDelegate: PartyName_1.PartyName.UNITY,
            renderData: RENDER_DATA,
        });
    }
    resolve(game, turmoil) {
        if (game.canRemoveOcean()) {
            game.defer(new RemoveOceanTile_1.RemoveOceanTile(game.getPlayersInGenerationOrder()[0], 'Dry Deserts Global Event - Remove an Ocean tile from the board'));
        }
        game.getPlayersInGenerationOrder().forEach((player) => {
            const count = turmoil.getPlayerInfluence(player);
            if (count > 0) {
                player.defer(new GainResources_1.GainResources(player, count, (0, MessageBuilder_1.message)('Dry Deserts Global Event - Gain ${0} resource(s) for influence', (b) => b.number(count))));
            }
        });
    }
}
exports.DryDeserts = DryDeserts;
