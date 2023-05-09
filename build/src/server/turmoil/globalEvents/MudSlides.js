"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MudSlides = void 0;
const GlobalEvent_1 = require("./GlobalEvent");
const GlobalEventName_1 = require("../../../common/turmoil/globalEvents/GlobalEventName");
const PartyName_1 = require("../../../common/turmoil/PartyName");
const Resource_1 = require("../../../common/Resource");
const CardRenderer_1 = require("../../cards/render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
const Board_1 = require("../../boards/Board");
const RENDER_DATA = CardRenderer_1.CardRenderer.builder((b) => {
    b.minus().megacredits(4).slash().oceans(1).emptyTile().influence({ size: Size_1.Size.SMALL });
});
class MudSlides extends GlobalEvent_1.GlobalEvent {
    constructor() {
        super({
            name: GlobalEventName_1.GlobalEventName.MUD_SLIDES,
            description: 'Lose 4 M€ for each tile adjacent to ocean (max 5, then reduced by influence).',
            revealedDelegate: PartyName_1.PartyName.KELVINISTS,
            currentDelegate: PartyName_1.PartyName.GREENS,
            renderData: RENDER_DATA,
        });
    }
    resolve(game, turmoil) {
        game.getPlayersInGenerationOrder().forEach((player) => {
            const tiles = game.board.spaces.filter(Board_1.Board.ownedBy(player))
                .filter((space) => space.tile !== undefined &&
                game.board.getAdjacentSpaces(space)
                    .filter((space) => Board_1.Board.isOceanSpace(space)).length > 0).length;
            const amount = Math.min(5, tiles) - turmoil.getPlayerInfluence(player);
            if (amount > 0) {
                player.deductResource(Resource_1.Resource.MEGACREDITS, 4 * amount, { log: true, from: this.name });
            }
        });
    }
}
exports.MudSlides = MudSlides;
