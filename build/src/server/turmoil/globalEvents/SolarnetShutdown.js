"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolarnetShutdown = void 0;
const GlobalEvent_1 = require("./GlobalEvent");
const GlobalEventName_1 = require("../../../common/turmoil/globalEvents/GlobalEventName");
const PartyName_1 = require("../../../common/turmoil/PartyName");
const Resource_1 = require("../../../common/Resource");
const CardType_1 = require("../../../common/cards/CardType");
const CardRenderer_1 = require("../../cards/render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
const AltSecondaryTag_1 = require("../../../common/cards/render/AltSecondaryTag");
const RENDER_DATA = CardRenderer_1.CardRenderer.builder((b) => {
    b.minus().megacredits(3).slash().cards(1, { secondaryTag: AltSecondaryTag_1.AltSecondaryTag.BLUE }).influence({ size: Size_1.Size.SMALL });
});
class SolarnetShutdown extends GlobalEvent_1.GlobalEvent {
    constructor() {
        super({
            name: GlobalEventName_1.GlobalEventName.SOLARNET_SHUTDOWN,
            description: 'Lose 3 M€ for each blue card (max 5, then reduced by influence).',
            revealedDelegate: PartyName_1.PartyName.SCIENTISTS,
            currentDelegate: PartyName_1.PartyName.MARS,
            renderData: RENDER_DATA,
        });
    }
    resolve(game, turmoil) {
        game.getPlayersInGenerationOrder().forEach((player) => {
            const amount = Math.min(5, player.playedCards.filter((card) => card.type === CardType_1.CardType.ACTIVE).length) - turmoil.getPlayerInfluence(player);
            if (amount > 0) {
                player.deductResource(Resource_1.Resource.MEGACREDITS, amount * 3, { log: true, from: this.name });
            }
        });
    }
}
exports.SolarnetShutdown = SolarnetShutdown;
