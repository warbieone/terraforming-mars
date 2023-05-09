"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Revolution = void 0;
const GlobalEvent_1 = require("./GlobalEvent");
const GlobalEventName_1 = require("../../../common/turmoil/globalEvents/GlobalEventName");
const PartyName_1 = require("../../../common/turmoil/PartyName");
const Tag_1 = require("../../../common/cards/Tag");
const CardRenderer_1 = require("../../cards/render/CardRenderer");
const Options_1 = require("../../cards/Options");
const Size_1 = require("../../../common/cards/render/Size");
const RENDER_DATA = CardRenderer_1.CardRenderer.builder((b) => {
    b.br.br;
    b.earth(1, { played: Options_1.played, size: Size_1.Size.SMALL }).plus().influence({ size: Size_1.Size.SMALL }).colon();
    b.text('1st:', Size_1.Size.SMALL).minus().tr(2, { size: Size_1.Size.TINY, digit: true });
    b.text('2nd:', Size_1.Size.SMALL).minus().tr(1, { size: Size_1.Size.TINY, digit: true });
});
class Revolution extends GlobalEvent_1.GlobalEvent {
    constructor() {
        super({
            name: GlobalEventName_1.GlobalEventName.REVOLUTION,
            description: 'Count Earth tags and ADD(!) influence. The player(s) with most (at least 1) loses 2 TR, and 2nd most (at least 1) loses 1 TR. SOLO: Lose 2 TR if the sum is 4 or more.',
            revealedDelegate: PartyName_1.PartyName.UNITY,
            currentDelegate: PartyName_1.PartyName.MARS,
            renderData: RENDER_DATA,
        });
    }
    resolve(game, turmoil) {
        if (game.isSoloMode()) {
            if (this.getScore(game.getPlayersInGenerationOrder()[0], turmoil) >= 4) {
                game.getPlayersInGenerationOrder()[0].decreaseTerraformRatingSteps(2, { log: true });
            }
        }
        else {
            const players = [...game.getPlayersInGenerationOrder()].sort((p1, p2) => this.getScore(p2, turmoil) - this.getScore(p1, turmoil));
            if (this.getScore(players[0], turmoil) > this.getScore(players[1], turmoil)) {
                players[0].decreaseTerraformRatingSteps(2, { log: true });
                players.shift();
                if (players.length === 1 && this.getScore(players[0], turmoil) > 0) {
                    players[0].decreaseTerraformRating({ log: true });
                }
                else if (players.length > 1) {
                    if (this.getScore(players[0], turmoil) > this.getScore(players[1], turmoil)) {
                        players[0].decreaseTerraformRating({ log: true });
                    }
                    else {
                        const score = this.getScore(players[0], turmoil);
                        while (players.length > 0 && this.getScore(players[0], turmoil) === score) {
                            if (this.getScore(players[0], turmoil) > 0) {
                                players[0].decreaseTerraformRating({ log: true });
                            }
                            players.shift();
                        }
                    }
                }
            }
            else {
                const score = this.getScore(players[0], turmoil);
                while (players.length > 0 && this.getScore(players[0], turmoil) === score) {
                    if (this.getScore(players[0], turmoil) > 0) {
                        players[0].decreaseTerraformRatingSteps(2, { log: true });
                    }
                    players.shift();
                }
            }
        }
    }
    getScore(player, turmoil) {
        return player.tags.count(Tag_1.Tag.EARTH, 'raw') + turmoil.getPlayerInfluence(player);
    }
}
exports.Revolution = Revolution;
