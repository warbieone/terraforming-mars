"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Election = void 0;
const GlobalEvent_1 = require("./GlobalEvent");
const GlobalEventName_1 = require("../../../common/turmoil/globalEvents/GlobalEventName");
const PartyName_1 = require("../../../common/turmoil/PartyName");
const Tag_1 = require("../../../common/cards/Tag");
const Board_1 = require("../../boards/Board");
const CardRenderer_1 = require("../../cards/render/CardRenderer");
const Options_1 = require("../../cards/Options");
const Size_1 = require("../../../common/cards/render/Size");
const RENDER_DATA = CardRenderer_1.CardRenderer.builder((b) => {
    b.influence({ size: Size_1.Size.SMALL }).plus().building(1, { played: Options_1.played, size: Size_1.Size.SMALL }).plus().city({ size: Size_1.Size.SMALL }).colon();
    b.text('1st:', Size_1.Size.SMALL).tr(2, { size: Size_1.Size.TINY, digit: true }).text('2nd:', Size_1.Size.SMALL).tr(1, { size: Size_1.Size.TINY });
});
class Election extends GlobalEvent_1.GlobalEvent {
    constructor() {
        super({
            name: GlobalEventName_1.GlobalEventName.ELECTION,
            description: 'Count your influence plus building tags and city tiles (no limits). The player with most (or 10 in solo) gains 2 TR, the 2nd (or 5 in solo) gains 1 TR (ties are friendly).',
            revealedDelegate: PartyName_1.PartyName.GREENS,
            currentDelegate: PartyName_1.PartyName.MARS,
            renderData: RENDER_DATA,
        });
    }
    resolve(game, turmoil) {
        if (game.isSoloMode()) {
            const player = game.getPlayers()[0];
            const score = this.getScore(player, turmoil, game);
            if (score >= 10) {
                player.increaseTerraformRatingSteps(2, { log: true });
            }
            else if (score >= 5) {
                player.increaseTerraformRatingSteps(1, { log: true });
            }
        }
        else {
            const players = game.getPlayers().slice().sort((p1, p2) => this.getScore(p2, turmoil, game) - this.getScore(p1, turmoil, game));
            if (this.getScore(players[0], turmoil, game) > this.getScore(players[1], turmoil, game)) {
                players[0].increaseTerraformRatingSteps(2, { log: true });
                players.shift();
                if (players.length === 1) {
                    players[0].increaseTerraformRatingSteps(1, { log: true });
                }
                else if (players.length > 1) {
                    if (this.getScore(players[0], turmoil, game) > this.getScore(players[1], turmoil, game)) {
                        players[0].increaseTerraformRatingSteps(1, { log: true });
                    }
                    else {
                        const score = this.getScore(players[0], turmoil, game);
                        while (players.length > 0 && this.getScore(players[0], turmoil, game) === score) {
                            players[0].increaseTerraformRatingSteps(1, { log: true });
                            players.shift();
                        }
                    }
                }
            }
            else {
                const score = this.getScore(players[0], turmoil, game);
                while (players.length > 0 && this.getScore(players[0], turmoil, game) === score) {
                    players[0].increaseTerraformRatingSteps(2, { log: true });
                    players.shift();
                }
            }
        }
    }
    getScore(player, turmoil, game) {
        const score = player.tags.count(Tag_1.Tag.BUILDING, 'raw') + turmoil.getPlayerInfluence(player);
        const cities = game.board.spaces.filter((space) => Board_1.Board.isCitySpace(space) && space.player === player).length;
        return score + cities;
    }
}
exports.Election = Election;
