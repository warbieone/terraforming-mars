"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Riots = void 0;
const GlobalEvent_1 = require("./GlobalEvent");
const GlobalEventName_1 = require("../../../common/turmoil/globalEvents/GlobalEventName");
const PartyName_1 = require("../../../common/turmoil/PartyName");
const Resource_1 = require("../../../common/Resource");
const Board_1 = require("../../boards/Board");
const CardRenderer_1 = require("../../cards/render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
const RENDER_DATA = CardRenderer_1.CardRenderer.builder((b) => {
    b.minus().megacredits(4).slash().city().influence({ size: Size_1.Size.SMALL });
});
class Riots extends GlobalEvent_1.GlobalEvent {
    constructor() {
        super({
            name: GlobalEventName_1.GlobalEventName.RIOTS,
            description: 'Lose 4 M€ for each city tile (max 5, then reduced by influence).',
            revealedDelegate: PartyName_1.PartyName.MARS,
            currentDelegate: PartyName_1.PartyName.REDS,
            renderData: RENDER_DATA,
        });
    }
    resolve(game, turmoil) {
        game.getPlayersInGenerationOrder().forEach((player) => {
            const city = game.board.spaces.filter((space) => Board_1.Board.isCitySpace(space) &&
                space.player === player).length;
            const amount = Math.min(5, city) - turmoil.getPlayerInfluence(player);
            if (amount > 0) {
                player.deductResource(Resource_1.Resource.MEGACREDITS, 4 * amount, { log: true, from: this.name });
            }
        });
    }
}
exports.Riots = Riots;
